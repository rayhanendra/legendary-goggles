import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from '../atoms/InputText';
import InputTel from '../atoms/InputTel';
import styled from '@emotion/styled';
import { DevTool } from '@hookform/devtools';
import Dialog from '../atoms/Dialog';
import Image from 'next/image';

const StyledDialogFormContactAction = styled.div`
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

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DialogContactAdd({ open, setOpen }: Props) {
  const defaultValues = {
    full_name: '',
    last_name: '',
    phones: [],
  };

  const validationSchema = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
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
    setOpen(false);
    formReset();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    setOpen(false);
    formReset();
  };

  const handleAddPhone = () => {
    append({ number: '' });
  };

  const handleRemovePhone = (index: number) => {
    remove(index);
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDialogFormContactAction>
          <button className='item' onClick={handleClose}>
            Cancel
          </button>
          <div className='title'>New Contact</div>
          <button type='submit' className='item'>
            Done
          </button>
        </StyledDialogFormContactAction>
        <StyledStack>
          <div>
            <Controller
              name='full_name'
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
    </Dialog>
  );
}

export default DialogContactAdd;