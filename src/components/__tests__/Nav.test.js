import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DotMenu, Nav } from '../Nav';

test('the correct display of value in the DotMenu', () => {
  render(<DotMenu name="A Name" />);

  // Name is not displayed
  expect(screen.queryByText('Hi, A Name')).not.toBeInTheDocument();

  // Name is displayed after click on DotMenu
  fireEvent.click(screen.getByText('Open options'));
  expect(screen.getByText('Hi, A Name')).toBeInTheDocument();
});

test('the logout onClick is executed', () => {
  let assertValue = false;
  render(<DotMenu logout={() => { assertValue = true; }} />);

  // assertValue is false
  expect(assertValue).toBe(false);

  // Open DotMenu
  fireEvent.click(screen.getByText('Open options'));

  // Click to trigger logout function
  fireEvent.click(screen.getByText('Log Out'));
  // Assert assertValue has changed to true
  expect(assertValue).toBe(true);
});

// NAV

test('the DotMenu not rendered when user is not authenticated', () => {
  const auth0 = require('@auth0/auth0-react');

  auth0.useAuth0 = jest.fn().mockReturnValue({ isAuthenticated: false, user: { name: 'NewName' }, logout: () => {} });

  render(<Nav />);

  expect(screen.queryByText('Open options')).not.toBeInTheDocument();
});

test('the DotMenu is rendered when user is authenticated', () => {
  const auth0 = require('@auth0/auth0-react');

  auth0.useAuth0 = jest.fn().mockReturnValue({ isAuthenticated: true, user: { name: 'NewName' }, logout: () => {} });

  render(<Nav />);

  expect(screen.getByText('Open options')).toBeInTheDocument();
});
