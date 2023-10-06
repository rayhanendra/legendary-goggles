import React, { Suspense } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from '../atoms/InputText';
import InputTel from '../atoms/InputTel';
import styled from '@emotion/styled';
import { DevTool } from '@hookform/devtools';
import Dialog from '../atoms/Dialog';
import Image from 'next/image';
import { TypedDocumentNode, gql, useMutation } from '@apollo/client';
import useGeneralStore from '@/store/generalStore';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
// import Loader from '../atoms/Loader';

const StyledDialogContactAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #1c1c1e;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 400;
  border-radius: 1rem 1rem 0 0;

  .title {
    font-weight: 700;
  }

  button {
    border: none;
    outline: none;
    padding: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const StyledAddPhone = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 400;
  background-color: ${({ theme }) => theme.palette.gray[900]}; // #2c2c2e
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledPhoneList = styled.div`
  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    outline: none;
    padding: 0px 12px;
    font-size: 1rem;
    font-weight: 400;
    background-color: ${({ theme }) => theme.palette.gray[900]}; // #2c2c2e
    color: ${({ theme }) => theme.palette.text.primary};

    button {
      border: none;
      outline: none;
      background-color: transparent;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

interface AddNumberToContactData {
  insert_phone: {
    returning: {
      contact: {
        id: string;
        last_name: string;
        first_name: string;
        phones: { number: string }[];
      };
    }[];
  };
}

interface AddNumberToContactVariables {
  contact_id: number;
  phone_number: string;
}

const ADD_NUMBER_TO_CONTACT: TypedDocumentNode<
  AddNumberToContactData,
  AddNumberToContactVariables
> = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

interface EditContactData {
  update_contact_by_pk: {
    id: string;
    first_name: string;
    last_name: string;
    phones: { number: string }[];
  };
}

interface EditContactVariables {
  id: number;
  _set: {
    first_name: string;
    last_name: string;
  };
}

const EDIT_CONTACT: TypedDocumentNode<
  EditContactData,
  EditContactVariables
> = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

interface EditPhoneNumberData {
  update_phone_by_pk: {
    contact: {
      id: string;
      last_name: string;
      first_name: string;
      created_at: string;
      phones: { number: string }[];
    };
  };
}

interface EditPhoneNumberVariables {
  pk_columns: {
    number: string;
    contact_id: number;
  };
  new_phone_number: string;
}

const EDIT_PHONE_NUMBER: TypedDocumentNode<
  EditPhoneNumberData,
  EditPhoneNumberVariables
> = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $new_phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $new_phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

interface GetContactDetailData {
  contact_by_pk: {
    last_name: string;
    id: string;
    first_name: string;
    created_at: string;
    phones: { number: string }[];
  };
}

interface GetContactDetailVariables {
  id: number;
}

const GET_CONTACT_DETAIL: TypedDocumentNode<
  GetContactDetailData,
  GetContactDetailVariables
> = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;

type Props = {
  open: boolean;
};

function DialogContact({ open }: Props) {
  return (
    <Dialog open={open}>
      {/* <Suspense fallback={<Loader />}> */}
      <FormParent />
      {/* </Suspense> */}
    </Dialog>
  );
}

// Note: This HOC is neccessary to make the form work properly. And trigger only when the dialog is open.
const FormParent = ({}: {}) => {
  const dialogAction = useGeneralStore((state) => state.dialogAction);

  const { data } = useSuspenseQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: dialogAction.data,
    },
    skip: !dialogAction.open && dialogAction.type !== 'edit',
  });

  return (
    <FormComponent
      data={{
        first_name: data?.contact_by_pk.first_name ?? '',
        last_name: data?.contact_by_pk.last_name ?? '',
        phones: data?.contact_by_pk.phones ?? [],
      }}
    />
  );
};

// Note: This is the actual form component.
// The form component is wrapped by FormParent HOC and waiting for the data to be fetched.
const FormComponent = ({
  data,
}: {
  data: {
    first_name: string;
    last_name: string;
    phones: { number: string }[];
  };
}) => {
  const dialogAction = useGeneralStore((state) => state.dialogAction);
  const setDialogAction = useGeneralStore((state) => state.setDialogAction);

  const defaultValues = {
    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
    phones: data.phones ?? [],
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('Full name is required'),
    last_name: yup.string().required('Last name is required'),
    phones: yup
      .array()
      .of(
        yup.object().shape({
          number: yup.string().required('Phone number is required'),
        })
      )
      .required('Phone number is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const formReset = () => {
    reset();
    clearErrors();
  };

  const handleClose = () => {
    setDialogAction({
      type: 'add',
      open: false,
    });
    formReset();
  };

  const { data: existingData } = useSuspenseQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: dialogAction.data,
    },
    skip: !dialogAction.open && dialogAction.type !== 'edit',
  });
  const [editContact] = useMutation(EDIT_CONTACT);
  const [editPhoneNumber] = useMutation(EDIT_PHONE_NUMBER);
  const [addNumberToContact] = useMutation(ADD_NUMBER_TO_CONTACT);

  const onSubmit = handleSubmit(async (data) => {
    if (
      !existingData?.contact_by_pk.first_name === !data.first_name &&
      !existingData?.contact_by_pk.last_name === !data.last_name
    ) {
      // Note: if there is a change in name
      try {
        await editContact({
          variables: {
            id: dialogAction.data,
            _set: {
              first_name: data.first_name,
              last_name: data.last_name,
            },
          },
        });
      } catch (error) {}
    }

    const objectsEqual = (o1: any, o2: any) =>
      Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => o1[p] === o2[p]);

    const arraysEqual = (a1: any, a2: any) =>
      a1.length === a2.length &&
      a1.every((o: any, idx: any) => objectsEqual(o, a2[idx]));

    if (!arraysEqual(existingData?.contact_by_pk.phones, data.phones)) {
      // Note: if there is a change in phone number
      try {
        await Promise.all(
          data.phones.map(async (phone, index) => {
            if (
              existingData?.contact_by_pk.phones[index]?.number === phone.number
            ) {
              // Note: there is no change in phone number at this index
              return;
            }

            // Note: edit phone number at this index
            await editPhoneNumber({
              variables: {
                pk_columns: {
                  number:
                    existingData?.contact_by_pk.phones[index]?.number ?? '',
                  contact_id: dialogAction.data,
                },
                new_phone_number: phone.number,
              },
            });
          })
        );
      } catch (error) {}
    }

    // Note: Add phone numbers
    for (const phone of data.phones) {
      if (
        !existingData?.contact_by_pk.phones.find(
          (item) => item.number === phone.number
        ) &&
        existingData?.contact_by_pk.phones?.length !== data.phones.length
      ) {
        // Note: if phone number does not exist and the length of the existing phone number is not equal to the length of the new phone number
        try {
          await addNumberToContact({
            variables: {
              contact_id: dialogAction.data,
              phone_number: phone.number,
            },
          });
        } catch (error) {}
      }
    }

    handleClose();
  });

  const handleAddPhone = () => {
    append({ number: '' });
  };

  const handleRemovePhone = (index: number) => {
    remove(index);
  };

  return (
    <form onSubmit={onSubmit}>
      <StyledDialogContactAction>
        <button type='button' className='item' onClick={handleClose}>
          Cancel
        </button>
        <div className='title'>Edit Contact</div>
        <button type='submit' className='item'>
          Done
        </button>
      </StyledDialogContactAction>
      <StyledStack>
        <div>
          <Controller
            name='first_name'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                placeholder='Full name'
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            name='last_name'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                placeholder='Last name'
                onChange={onChange}
                value={value}
                error={error}
              />
            )}
          />
        </div>
        <div>
          <StyledPhoneList>
            {fields.map((item, index) => (
              <div key={item.id} className='item'>
                <div>
                  <div onClick={() => handleRemovePhone(index)}>
                    <Image
                      src='/images/minus-rounded.svg'
                      alt='minus-rounded'
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <Controller
                  name={`phones.${index}.number`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTel
                      placeholder='Phone number'
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                />
              </div>
            ))}
          </StyledPhoneList>
          <StyledAddPhone onClick={handleAddPhone}>
            <Image
              src={'/images/plus-rounded.svg'}
              alt='plus-rounded'
              width={20}
              height={20}
            />
            add phone
          </StyledAddPhone>
          {errors.phones && (
            <div className='helper-text'>{errors.phones.message}</div>
          )}
        </div>
      </StyledStack>
      <DevTool control={control} />
    </form>
  );
};

export default DialogContact;
