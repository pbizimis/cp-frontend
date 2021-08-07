import React from "react"
import {render, screen} from '@testing-library/react'
import Console from "../index"
import { act } from "react-dom/test-utils";

// Stub the authentication requirement
jest.mock("@auth0/auth0-react", () => ({
    withAuthenticationRequired: jest.fn().mockImplementation((component) => component)
}))

const exampleData = {
    "error": null,
    "data": {
        "stylegan_models": [
            {
                "version": "StyleGan2ADA",
                "models": [
                    {
                        "img": 31,
                        "res": 256,
                        "fid": 12,
                        "version": "stylegan2_ada"
                    }
                ]
            },
            {
                "version": "StyleGan1ADA",
                "models": [
                    {
                        "img": 31,
                        "res": 256,
                        "fid": 12,
                        "version": "stylegan2_ada"
                    }
                ]
            }
        ]
    }
};

test('shows a loading circle when the user authentication is loading', async () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: true, getAccessTokenSilently: () => {} });
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return exampleData});

    let containerElement;
    await act(async () => {
        const { container } = render(<Console />)
        containerElement = container
    })
    
    expect(containerElement.querySelectorAll("svg").length).toBe(1)
})

test('shows version names of fetched stylegan models', async () => {

    const auth0 = require('@auth0/auth0-react');
    auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: false, getAccessTokenSilently: () => {} });
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return exampleData});

    await act(async () => {
        render(<Console />)
    })
    
    expect(screen.getByText("StyleGan1ADA")).toBeInTheDocument()
    expect(screen.getByText("StyleGan2ADA")).toBeInTheDocument()
})