import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ContactHeader from '@/components/molecules/ContactHeader';
import DialogFormContact from '@/components/molecules/DialogFormContact';
import ContactList from '@/components/molecules/ContactList';
import useGeneralStore from '@/store/generalStore';
import DialogContact from '../molecules/DialogContact';
import ContactPagination from '../molecules/ContactPagination';
import { useSearchParams } from 'next/navigation';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function ContactPage() {
  const dialogAction = useGeneralStore((state) => state.dialogAction);
  const { queryVariables } = useContactPageQuery();

  return (
    <>
      <StyledContainer>
        <ContactHeader />
        <ContactList variables={queryVariables} />
        <ContactPagination />
      </StyledContainer>
      <DialogContact open={dialogAction.open && dialogAction.type === 'edit'} />
      <DialogFormContact
        open={dialogAction.open && dialogAction.type === 'add'}
      />
    </>
  );
}

const useContactPageQuery = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = 6;

  const where = {
    _or: [
      {
        first_name: {
          _ilike: `%${searchValue}%`,
        },
      },
      {
        last_name: {
          _ilike: `%${searchValue}%`,
        },
      },
      {
        phones: {
          number: {
            _ilike: `%${searchValue}%`,
          },
        },
      },
    ],
  };

  const [queryVariables, setQueryVariables] = useState<{
    distinct_on?: string[];
    limit: number;
    offset?: number;
    order_by?: { [key: string]: string }[];
    where?: { [key: string]: any };
  }>({
    distinct_on: undefined,
    limit: limit,
    offset: undefined,
    order_by: undefined,
    where: where,
  });

  // Note: If the searchValue change then fetch the data without offset
  useEffect(() => {
    setQueryVariables({
      ...queryVariables,
      offset: undefined,
      where: where,
    });
  }, [searchValue]);

  // Note: If the page change then fetch the data with offset
  useEffect(() => {
    setQueryVariables({
      ...queryVariables,
      offset: page * limit - limit,
      where: where,
    });
  }, [page]);

  return { queryVariables };
};

export default ContactPage;
