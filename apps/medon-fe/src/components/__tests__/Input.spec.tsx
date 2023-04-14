import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';

import Input from 'components/Input';
import { theme } from 'styles/theme';
import '@testing-library/jest-dom';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Input component', () => {
  it('renders correctly', () => {
    render(
      <Wrapper>
        <Input />
      </Wrapper>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays error message if errorMessage prop is provided', () => {
    render(
      <Wrapper>
        <Input errorMessage="Invalid input" />
      </Wrapper>
    );
    const errorElement = screen.getByText('Invalid input');
    expect(errorElement).toBeInTheDocument();
  });

  it('applies error border if errorMessage prop is provided', () => {
    render(
      <Wrapper>
        <Input errorMessage="Invalid input" />
      </Wrapper>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveStyle({
      border: `1px solid ${theme.colors.red_500}`,
    });
  });

  it('does not apply error border if errorMessage prop is not provided', () => {
    render(
      <Wrapper>
        <Input />
      </Wrapper>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveStyle({
      border: `1px solid ${theme.colors.gray_400}`,
    });
  });

  it('forwards refs to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <Wrapper>
        <Input ref={ref} />
      </Wrapper>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toEqual(ref.current);
  });
});
