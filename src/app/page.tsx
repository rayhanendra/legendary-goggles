'use client';

import * as React from 'react';
import styled from '@emotion/styled';
import ContactHeader from '@/components/molecules/ContactHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledContactItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
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

  return (
    <Container>
      <ContactHeader />
      <div>{contactList}</div>

      {/* <Alert
        title='Hello 👋'
        content='This app uses the Next.js App Router and Emotion.'
      />
      <TypeCard title='Molecule' content='This is a molecule component' />
      <Dashboard /> */}
    </Container>
  );
}
