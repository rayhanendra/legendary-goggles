import { render, fireEvent } from '@testing-library/react';
import ContactListItem from '../../components/atoms/ContactListItem';
import { ThemeProvider } from '@emotion/react';
import theme from '@/components/ThemeRegistry/theme';

describe('ContactListItem', () => {
  const contact = {
    first_name: 'Abang',
    last_name: 'Asep',
    phones: [{ number: '1234567890' }],
  };
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact name and phone number', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ContactListItem
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </ThemeProvider>
    );

    expect(getByText('Abang Asep')).toBeInTheDocument();
    expect(getByText('1234567890')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ContactListItem
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </ThemeProvider>
    );

    fireEvent.click(getByText('Edit'));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ContactListItem
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </ThemeProvider>
    );

    fireEvent.click(getByText('Delete'));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
