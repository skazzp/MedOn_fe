import { render, screen } from '@testing-library/react';
import LinkHome from 'components/LinkHome';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('LinkHome component', () => {
  it('renders a link with the provided text color and background color', () => {
    render(
      <TestWrapper>
        <LinkHome to="/" textcolor="#fff" bgcolor="#000">
          Home
        </LinkHome>
      </TestWrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveStyle('color: #fff');
    expect(link).toHaveStyle('background-color: #000');
  });

  it('renders a full-width link when isfullwidth prop is true', () => {
    render(
      <TestWrapper>
        <LinkHome to="/" isfullwidth="true">
          Home
        </LinkHome>
      </TestWrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveStyle('width: 100%');
  });

  it('renders a link with the provided to prop', () => {
    render(
      <TestWrapper>
        <LinkHome to="/">Home</LinkHome>
      </TestWrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
