import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Chat } from 'components/Chat';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('It', () => {
  const chatProps = {
    onSubmitMessage: () => {},
    history: [],
    reply: null,
    user: {
      firstName: 'Doctor firstName',
      lastName: 'Doctor lastName',
      email: 'doctor@gmail.com',
      role: null,
      specialityId: null,
      photo: '',
      dateOfBirth: null,
      isVerified: true,
      country: null,
      city: 'Ukraine',
      timeZone: null,
      id: 2,
    },
    patientFullName: 'Test patient Name',
  };

  it('should render closed Chat by default', () => {
    const { getByAltText } = render(
      <TestWrapper>
        <Chat {...chatProps} />
      </TestWrapper>
    );
    const element = getByAltText('Close chat');
    expect(element).toBeInTheDocument();
  });

  it('should render patient name on the header of the chat when chat is opened', () => {
    const { getByAltText, getByText } = render(
      <TestWrapper>
        <Chat {...chatProps} />
      </TestWrapper>
    );

    fireEvent.click(getByAltText('Close chat'));
    const element = getByText('Patient: Test patient Name');
    expect(element).toBeInTheDocument();
  });
});
