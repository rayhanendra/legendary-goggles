import styled from '@emotion/styled';
import React from 'react';

const StyledInputText = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 400;
  background-color: #2c2c2e;
  color: #ffffff;

  ::placeholder {
    color: #ffffff;
    opacity: 0.5;
  }
`;

type Props = {
  placeholder: string;
};

function InputText({ placeholder }: Props) {
  return <StyledInputText placeholder={placeholder} />;
}

export default InputText;
