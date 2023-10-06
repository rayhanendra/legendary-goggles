import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ContactList, {
  GET_CONTACT_LIST,
} from '../../components/molecules/ContactList';
import { ThemeProvider } from '@emotion/react';
import theme from '@/components/ThemeRegistry/theme';

const mocks = [
  {
    request: {
      query: GET_CONTACT_LIST,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: {
      data: {
        contact: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            phones: [{ number: '123-456-7890' }],
          },
          {
            id: 2,
            first_name: 'Jane',
            last_name: 'Doe',
            phones: [{ number: '987-654-3210' }],
          },
        ],
      },
    },
  },
];

describe('ContactList', () => {
  it('renders a list of contacts', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ContactList variables={{ limit: 10, offset: 0 }} />
        </MockedProvider>
      </ThemeProvider>
    );

    expect(screen.getByAltText('loader')).toBeInTheDocument();
  });
});
