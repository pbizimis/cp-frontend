import React from "react"
import {render, screen} from '@testing-library/react'
import StyleGan2ADA from "../stylegan2ada"
import { act } from "react-dom/test-utils";

// Stub the authentication requirement
jest.mock("@auth0/auth0-react", () => ({
    withAuthenticationRequired: jest.fn().mockImplementation((component) => component)
}))

test('shows a loading circle when the user authentication is loading', async () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: true, getAccessTokenSilently: () => {} });
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return {"data": "stubData"}});

    let containerElement;
    await act(async () => {
        const { container } = render(<StyleGan2ADA />)
        containerElement = container
    })
    
    expect(containerElement.querySelectorAll("svg").length).toBe(1)
})

test('shows version names of fetched stylegan models', async () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: false, getAccessTokenSilently: () => {} });
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return {"data": "stubData"}});
    const Methods = require('../../../components/Methods');
    Methods.Methods = jest.fn().mockReturnValue(<h1>Methods are rendered!</h1>);

    await act(async () => {
        render(<StyleGan2ADA />)
    })
    
    expect(screen.getByText("Methods are rendered!")).toBeInTheDocument()
})