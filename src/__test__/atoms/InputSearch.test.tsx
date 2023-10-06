import { render, screen, fireEvent } from '@testing-library/react';
import InputSearch from '../../components/atoms/InputSearch';

describe('InputSearch', () => {
  it('renders the search input and icon', () => {
    render(<InputSearch value='' onchange={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search');
    const searchIcon = screen.getByAltText('search');

    expect(searchInput).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('calls onchange when the input value changes', () => {
    const handleChange = jest.fn();
    render(<InputSearch value='' onchange={handleChange} />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});