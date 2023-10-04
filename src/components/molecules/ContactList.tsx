import { TypedDocumentNode, gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { Suspense } from 'react';
import ContactListItem from '../atoms/ContactListItem';

interface Data {
  contact: {
    created_at: string;
    first_name: string;
    id: string;
    last_name: string;
    phones: { number: string }[];
  }[];
}

interface Variables {
  distinct_on?: string[];
  limit?: number;
  offset?: number;
  order_by?: { [key: string]: string }[];
  where?: { [key: string]: any };
}

const GET_CONTACT_LIST: TypedDocumentNode<Data, Variables> = gql`
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
  variables: Variables;
};

function ContactList({ variables }: Props) {
  const {
    data: { contact: contacts },
  }: {
    data: Data;
  } = useSuspenseQuery(GET_CONTACT_LIST, {
    variables,
  });

  const contactList = contacts.map((contact, index) => {
    return (
      <ContactListItem
        contact={contact}
        key={`${contact.id}-${index}`}
        onDelete={() => {
          console.log('delete', index);
        }}
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
