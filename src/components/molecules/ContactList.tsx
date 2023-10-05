import { TypedDocumentNode, gql, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { Suspense, useCallback } from 'react';
import ContactListItem from '../atoms/ContactListItem';
import useContactStore from '@/store/contactStore';

interface DeleteContactPhoneData {
  delete_contact_by_pk: {
    first_name: string;
    last_name: string;
    id: string;
  };
}

interface DeleteContactPhoneVariables {
  id: number;
}

const DELETE_CONTACT_PHONE: TypedDocumentNode<
  DeleteContactPhoneData,
  DeleteContactPhoneVariables
> = gql`
  mutation DeleteContactPhone($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

interface GetContactListData {
  contact:
    | {
        created_at: string;
        first_name: string;
        id: number;
        last_name: string;
        phones: { number: string }[];
      }[];
}

interface GetContactListVariables {
  distinct_on?: string[];
  limit?: number;
  offset?: number;
  order_by?: { [key: string]: string }[];
  where?: { [key: string]: any };
}

const GET_CONTACT_LIST: TypedDocumentNode<
  GetContactListData,
  GetContactListVariables
> = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

type Props = {
  variables: GetContactListVariables;
};

function ContactList({ variables }: Props) {
  const setDialogAction = useContactStore((state) => state.setDialogAction);

  const {
    data: { contact: contacts },
  }: {
    data: GetContactListData;
  } = useSuspenseQuery(GET_CONTACT_LIST, {
    variables,
  });

  const [deleteContactPhone] = useMutation(DELETE_CONTACT_PHONE, {
    // Note: current solution is to refetch the whole list, instead of updating the cache. because right now updating the cache is not working.
    refetchQueries: [
      {
        query: GET_CONTACT_LIST,
        variables,
      },
    ],
  });

  const handleDelete = async (id: number) => {
    try {
      deleteContactPhone({
        variables: {
          id,
        },
        update: (cache, { data }) => {
          // // Note: writeQuery and updateQuery just wont work. I dont know why
          // const existingContacts = cache.readQuery<Data>({
          //   query: GET_CONTACT_LIST,
          //   variables,
          // });
          // console.log('existingContacts', existingContacts);
          // const newContacts = existingContacts?.contact.filter(
          //   (contact) => contact.id !== id
          // );
          // console.log('newContacts', newContacts);
          // cache.writeQuery<Data>({
          //   query: GET_CONTACT_LIST,
          //   variables,
          //   data: {
          //     contact: newContacts?.length ? newContacts : [],
          //   },
          // });
          // --------------------------------------------
          // console.log('cache', cache);
          // console.log('data', data);
          // console.log('variables', variables);
          // cache.writeQuery({
          //   query: GET_CONTACT_LIST,
          //   data: {
          //     contact: contacts.filter((contact) => contact.id !== id),
          //   },
          // });
          // --------------------------------------------
          // cache.updateQuery<Data>(
          //   {
          //     query: GET_CONTACT_LIST,
          //     ...variables,
          //   },
          //   (data) => {
          //     console.log('data', data);
          //     if (!data) {
          //       return data;
          //     }
          //     console.log('data after', data);
          //     const newData = {
          //       ...data,
          //       contact: data.contact.filter((contact) => contact.id !== id),
          //     };
          //     return newData;
          //   }
          // );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = (id: number) => {
    setDialogAction({
      type: 'edit',
      open: true,
      data: id,
    });
  };

  const contactList = contacts.map((contact, index) => {
    return (
      <ContactListItem
        contact={contact}
        key={`${contact.id}-${index}`}
        onDelete={() => handleDelete(Number(contact.id))}
        onEdit={() => handleOpenDialog(contact.id)}
      />
    );
  });

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div>{contactList}</div>
    </Suspense>
  );
}

export default ContactList;
