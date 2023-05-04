import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Button from 'components/Button';

import { TestWrapper } from 'utils/tests/TestWrapper';

describe('Button', () => {
  it('renders the button with the correct text content', () => {
    render(
      <TestWrapper>
        <Button textcolor="white" bgcolor="blue" isfullwidth="true">
          Hello
        </Button>
      </TestWrapper>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Hello');
  });

  it('renders the button with the correct background color', () => {
    render(
      <TestWrapper>
        <Button textcolor="white" bgcolor="blue" isfullwidth="true">
          Hello
        </Button>
      </TestWrapper>
    );
    expect(screen.getByRole('button')).toHaveStyle('background-color: blue');
  });

  it('renders the button with the correct text color', () => {
    render(
      <TestWrapper>
        <Button textcolor="white" bgcolor="blue" isfullwidth="true">
          Hello
        </Button>
      </TestWrapper>
    );
    expect(screen.getByRole('button')).toHaveStyle('color: white');
  });

  it('renders the button as full width when isfullwidth prop is true', () => {
    render(
      <TestWrapper>
        <Button textcolor="white" bgcolor="blue" isfullwidth="true">
          Hello
        </Button>
      </TestWrapper>
    );
    expect(screen.getByRole('button')).toHaveStyle('width: 100%');
  });

  it('calls the onClick function when clicked', async () => {
    const handleClick = jest.fn();

    render(
      <TestWrapper>
        <Button
          textcolor="white"
          bgcolor="blue"
          isfullwidth="true"
          onClick={handleClick}
        >
          Hello
        </Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button', {
      name: /Hello/i,
    });

    fireEvent.click(button);
    await waitFor(async () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
