import styled from '@emotion/styled';
import React from 'react';

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
    color: ${(props) => props.theme.palette.text.primary};
  }

  .phone {
    font-size: 0.8rem;
    font-weight: 100;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

type Props = {
  contact: {
    first_name: string;
    last_name: string;
    phones: { number: string }[];
  };
};

function ContactListItem({ contact }: Props) {
  return (
    <StyledContactItem>
      <div className='name'>
        {contact.first_name} {contact.last_name}
      </div>
      <div className='phone'>{contact.phones[0]?.number ?? '-'}</div>
    </StyledContactItem>
  );
}

export default ContactListItem;
