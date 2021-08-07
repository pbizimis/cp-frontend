import React from "react"
import {render, screen} from '@testing-library/react'
import { Error } from '../AuthError';

test('shows the error message is displayed when passed to the Error component', () => {
  const errorMessage = 'This is an error!'
  render(<Error message={errorMessage}/>)
  expect(screen.getByText("Oops... " + errorMessage)).toBeInTheDocument()
})