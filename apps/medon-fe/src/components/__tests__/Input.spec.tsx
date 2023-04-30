import React from 'react';

import { render, screen } from '@testing-library/react';

import Input from 'components/Input';

import { theme } from 'styles/theme';

import { TestWrapper } from 'utils/tests/TestWrapper';

describe('Input component', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <Input errorMessage="" />
      </TestWrapper>
    );
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  it('displays error message if errorMessage prop is provided', () => {
    render(
      <TestWrapper>
        <Input errorMessage="Invalid input" />
      </TestWrapper>
    );
    const errorElement = screen.getByText('Invalid input');

    expect(errorElement).toBeInTheDocument();
  });

  it('applies error border if errorMessage prop is provided', () => {
    render(
      <TestWrapper>
        <Input errorMessage="Invalid input" />
      </TestWrapper>
    );
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveStyle({
      border: `1px solid ${theme.colors.red_500}`,
    });
  });

  it('does not apply error border if errorMessage prop is not provided', () => {
    render(
      <TestWrapper>
        <Input errorMessage="" />
      </TestWrapper>
    );
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveStyle({
      border: `1px solid ${theme.colors.gray_400}`,
    });
  });

  it('forwards refs to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <TestWrapper>
        <Input ref={ref} errorMessage="" />
      </TestWrapper>
    );
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toEqual(ref.current);
  });
});
