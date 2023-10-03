import * as React from 'react';
import styled from '@emotion/styled';
import ContactHeader from '@/components/molecules/ContactHeader';
import DialogContactAdd from '@/components/molecules/DialogContactAdd';
import ContactList from '@/components/molecules/ContactList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function ContactPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Container>
        <ContactHeader open={open} setOpen={setOpen} />
        <ContactList
          variables={{
            distinct_on: undefined,
            limit: 10,
            offset: undefined,
            order_by: undefined,
            where: undefined,
          }}
        />
      </Container>
      <DialogContactAdd open={open} setOpen={setOpen} />
    </>
  );
}

export default ContactPage;
