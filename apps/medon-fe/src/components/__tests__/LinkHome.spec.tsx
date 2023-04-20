import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import LinkHome from 'components/LinkHome';
import { theme } from 'styles/theme';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
);

describe('LinkHome component', () => {
  it('renders a link with the provided text color and background color', () => {
    render(
      <Wrapper>
        <LinkHome to="/" textcolor="#fff" bgcolor="#000">
          Home
        </LinkHome>
      </Wrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveStyle('color: #fff');
    expect(link).toHaveStyle('background-color: #000');
  });

  it('renders a full-width link when isfullwidth prop is true', () => {
    render(
      <Wrapper>
        <LinkHome to="/" isfullwidth="true">
          Home
        </LinkHome>
      </Wrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveStyle('width: 100%');
  });

  it('renders a link with the provided to prop', () => {
    render(
      <Wrapper>
        <LinkHome to="/">Home</LinkHome>
      </Wrapper>
    );
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
