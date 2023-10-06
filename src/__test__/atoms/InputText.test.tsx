import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputText from '../../components/atoms/InputText';
import { ThemeProvider } from '@emotion/react';
import theme from '@/components/ThemeRegistry/theme';

describe('InputText', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <InputText
          placeholder='First name'
          onChange={() => {}}
          value=''
          error={undefined}
        />
      </ThemeProvider>
    );

    expect(getByPlaceholderText('First name')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InputText
          placeholder='First name'
          onChange={() => {}}
          value=''
          error={{ message: 'Name is required', type: 'required' }}
        />
      </ThemeProvider>
    );

    expect(getByText('Name is required')).toBeInTheDocument();
  });
});
