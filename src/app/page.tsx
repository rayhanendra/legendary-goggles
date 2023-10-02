'use client';

import * as React from 'react';
import styled from '@emotion/styled';
import ContactHeader from '@/components/molecules/ContactHeader';
import DialogContactAdd from '@/components/molecules/DialogContactAdd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledContactItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  :not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .name {
    font-weight: 300;
    color: #ffffff;
  }

  .phone {
    font-size: 0.8rem;
    font-weight: 100;
    color: #ffffff;
  }
`;

export default function HomePage() {
  const contacts = [
    {
      first_name: 'John',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      phones: [
        {
          number: '1234567890',
        },
      ],
    },
  ];

  const contactList = contacts.map((contact, index) => {
    return (
      <StyledContactItem key={index}>
        <div className='name'>
          {contact.first_name} {contact.last_name}
        </div>
        <div className='phone'>{contact.phones[0].number}</div>
      </StyledContactItem>
    );
  });

  const [open, setOpen] = React.useState(false);

  return (
    <Container>
      <ContactHeader open={open} setOpen={setOpen} />
      <div>{contactList}</div>
      <DialogContactAdd open={open} setOpen={setOpen} />
    </Container>
  );
}
