import React from "react"
import {render, screen} from '@testing-library/react'
import Index from '../../pages/index';

test('shows a loading circle when the user authentication is loading', () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: true, error: null });
        
    const { container } = render(<Index />)
    expect(container.querySelectorAll("svg").length).toBe(1)
})

test('shows an error when an Auth0 error occurs', () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: false, error: {"message": "Error"}});
        
    render(<Index />)
    expect(screen.getByText("Oops... Error")).toBeInTheDocument()
})

test('shows the index when no loading or error is occuring', () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: false, error: {}});
        
    render(<Index />)
    expect(screen.getByText("WebDesig(a)n")).toBeInTheDocument()
})