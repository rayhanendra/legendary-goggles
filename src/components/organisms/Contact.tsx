import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import ContactHeader from '@/components/molecules/ContactHeader';
import DialogFormContact from '@/components/molecules/DialogFormContact';
import ContactList from '@/components/molecules/ContactList';
import useContactStore from '@/store/contactStore';
import { useDebounce } from '@/hooks/useDebounce';
import DialogContact from '../molecules/DialogContact';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function ContactPage() {
  const dialogAction = useContactStore((state) => state.dialogAction);
  const searchValue = useContactStore((state) => state.searchValue);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const where = {
    _or: [
      {
        first_name: {
          _ilike: `%${debouncedSearchValue}%`,
        },
      },
      {
        last_name: {
          _ilike: `%${debouncedSearchValue}%`,
        },
      },
      {
        phones: {
          number: {
            _ilike: `%${debouncedSearchValue}%`,
          },
        },
      },
    ],
  };

  return (
    <>
      <Container>
        <ContactHeader />
        <ContactList
          variables={{
            distinct_on: undefined,
            limit: undefined,
            offset: undefined,
            order_by: undefined,
            where: where,
          }}
        />
      </Container>
      <DialogContact open={dialogAction.open && dialogAction.type === 'edit'} />
      <DialogFormContact />
    </>
  );
}

export default ContactPage;
