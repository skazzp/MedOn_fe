import { render, screen, fireEvent } from '@testing-library/react';
import { AddLinkModal } from 'components/AppointmentsCardAddModal';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('AppointmentsCardAddModal', () => {
  const defaultProps = {
    id: '123',
    hideAddModal: jest.fn(),
    isAddVisible: true,
  };

  it('renders the modal with the correct title', () => {
    render(
      <TestWrapper>
        <AddLinkModal {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByText(/Add Link to Zoom Call/i)).toBeInTheDocument();
  });

  it('calls hideAddModal when cancel button is clicked', () => {
    render(
      <TestWrapper>
        <AddLinkModal {...defaultProps} />
      </TestWrapper>
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(defaultProps.hideAddModal).toHaveBeenCalled();
  });
});
