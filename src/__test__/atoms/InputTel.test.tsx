import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputTel from '../../components/atoms/InputTel';
import { ThemeProvider } from '@emotion/react';
import theme from '@/components/ThemeRegistry/theme';

describe('InputTel', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <InputTel
          placeholder='Enter phone number'
          onChange={() => {}}
          value=''
          error={undefined}
        />
      </ThemeProvider>
    );

    expect(getByPlaceholderText('Enter phone number')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <InputTel
          placeholder='Enter phone number'
          onChange={handleChange}
          value=''
          error={undefined}
        />
      </ThemeProvider>
    );

    const input = getByPlaceholderText('Enter phone number');
    fireEvent.change(input, { target: { value: '1234567890' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is passed', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InputTel
          placeholder='Enter phone number'
          onChange={() => {}}
          value=''
          error={{ message: 'Invalid phone number', type: 'required' }}
        />
      </ThemeProvider>
    );

    expect(getByText('Invalid phone number')).toBeInTheDocument();
  });
});
