import * as React from 'react';

import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';

const GET_CONTACT_LIST = gql`
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

interface Response {
  contact: {
    created_at: string;
    first_name: string;
    id: string;
    last_name: string;
    phones: { number: string }[];
  }[];
}

async function Page() {
  const data = await getClient().query<Response>({
    query: GET_CONTACT_LIST,
  });

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Page;
