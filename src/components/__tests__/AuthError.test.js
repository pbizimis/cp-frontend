import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from '../AuthError';

test('shows the error message is displayed when passed to the Error component', () => {
  render(<Error message={'This is an error!'} />);
  expect(screen.getByText('This is an error!')).toBeInTheDocument();
});
