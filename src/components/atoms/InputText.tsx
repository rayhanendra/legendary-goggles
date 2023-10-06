import styled from '@emotion/styled';
import React from 'react';
import { FieldError } from 'react-hook-form';

const StyledInputText = styled.div`
  input {
    width: 100%;
    border: none;
    outline: none;
    padding: 12px 16px;
    font-size: 1rem;
    font-weight: 400;
    background-color: ${({ theme }) => theme.palette.gray[900]}; // #2c2c2e
    color: #ffffff;

    ::placeholder {
      color: ${({ theme }) => theme.palette.text.secondary};
    }
  }

  .helper-text {
    padding: 2px 16px;
    color: ${({ theme }) => theme.palette.error.light};
    font-size: 0.75rem;
  }
`;

type Props = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: FieldError | undefined;
};

function InputText({ placeholder, onChange, value, error }: Props) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.charCode;
    if (charCode === 0) {
      return;
    }
    const char = String.fromCharCode(charCode);
    const pattern = /[^a-zA-Z\s]/gi;
    if (pattern.test(char)) {
      e.preventDefault();
    }
  };

  return (
    <StyledInputText>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete='off'
        onKeyPress={handleKeyPress}
      />
      {error?.message && <div className='helper-text'>{error?.message}</div>}
    </StyledInputText>
  );
}

export default InputText;
