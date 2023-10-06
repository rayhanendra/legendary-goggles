import styled from '@emotion/styled';
import React from 'react';
import { FieldError } from 'react-hook-form';

const StyledInputTel = styled.div`
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

function InputTel({ placeholder, onChange, value, error }: Props) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.charCode;
    if (charCode === 0) {
      return;
    }
    const char = String.fromCharCode(charCode);
    const pattern = /^[0-9]*$/;
    if (!pattern.test(char)) {
      e.preventDefault();
    }
  };

  return (
    <StyledInputTel>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type='tel'
        inputMode='tel'
        autoComplete='off'
        onKeyPress={handleKeyPress}
      />
      {error?.message && <div className='helper-text'>{error?.message}</div>}
    </StyledInputTel>
  );
}

export default InputTel;
