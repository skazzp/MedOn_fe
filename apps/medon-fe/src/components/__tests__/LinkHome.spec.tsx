import { render, screen } from '@testing-library/react';
import { Link } from 'components/Link';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('Link component', () => {
  it('renders a link with the provided text color and background color', () => {
    render(
      <TestWrapper>
        <Link to="/" textcolor="#fff" bgcolor="#000">
          Home
        </Link>
      </TestWrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveStyle('color: #fff');
    expect(link).toHaveStyle('background-color: #000');
  });

  it('renders a full-width link when isfullwidth prop is true', () => {
    render(
      <TestWrapper>
        <Link to="/" isfullwidth="true">
          Home
        </Link>
      </TestWrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveStyle('width: 100%');
  });

  it('renders a link with the provided to prop', () => {
    render(
      <TestWrapper>
        <Link to="/">Home</Link>
      </TestWrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
