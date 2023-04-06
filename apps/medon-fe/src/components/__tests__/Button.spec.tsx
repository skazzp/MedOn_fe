import { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { render, screen, fireEvent } from '@testing-library/react';
import { theme } from '../../styles/theme';
import Button from '../Button';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Button', () => {
  it('renders the button with the correct text content', () => {
    render(
      <Wrapper>
        <Button>Hello</Button>
      </Wrapper>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Hello');
  });

  it('renders the button with the correct background color', () => {
    render(
      <Wrapper>
        <Button bgcolor="blue">Hello</Button>
      </Wrapper>
    );

    expect(screen.getByRole('button')).toHaveStyle('background-color: blue');
  });

  it('renders the button with the correct text color', () => {
    render(
      <Wrapper>
        <Button textcolor="white">Hello</Button>
      </Wrapper>
    );

    expect(screen.getByRole('button')).toHaveStyle('color: white');
  });

  it('renders the button as full width when isfullwidth prop is true', () => {
    render(
      <Wrapper>
        <Button isfullwidth="true">Hello</Button>
      </Wrapper>
    );
    expect(screen.getByRole('button')).toHaveStyle('width: 100%');
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Wrapper>
        <Button onClick={handleClick}>Hello</Button>
      </Wrapper>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
