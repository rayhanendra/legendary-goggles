import { render } from '@testing-library/react';
import Loader from '../../components/atoms/Loader';

describe('Loader', () => {
  it('should render the loader image', () => {
    const { getByAltText } = render(<Loader />); // ARRANGE

    const loaderImage = getByAltText('loader'); // ACT

    expect(loaderImage).toBeInTheDocument(); // ASSERT
  });

  it('should have the correct width and height', () => {
    const { getByAltText } = render(<Loader />);

    const loaderImage = getByAltText('loader');

    expect(loaderImage).toHaveAttribute('width', '46');
    expect(loaderImage).toHaveAttribute('height', '46');
  });
});
