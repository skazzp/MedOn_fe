import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestWrapper } from 'utils/tests/TestWrapper';
import { ShowMore } from '../ShowMore/index';

describe('ShowMore component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders text in the ShowMore component correctly', () => {
    render(
      <TestWrapper>
        <ShowMore text="Lorem ipsum" prefix="Prefix" />
      </TestWrapper>
    );

    const prefixText = screen.getByText('Prefix');

    expect(prefixText).toBeInTheDocument();

    const contentText = screen.getByText('Lorem ipsum');

    expect(contentText).toBeInTheDocument();
  });
});
