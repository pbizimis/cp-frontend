import React from "react"
import {fireEvent, render, screen} from '@testing-library/react'
import Console from '../console/index'
import { act } from 'react-dom/test-utils'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const fakeModelsData = {
    "stylegan_models": [
        {
            "version": "StyleGan1",
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

const fakeImageData = {
    "image_url_prefix": "https://images.webdesigan.com/",
    "image_ids": [
        {
            "url": "c31ad1323ed648feb93cd7398fcf1894",
            "auth0_id": "google-oauth2|114778200891334419591",
            "creation_date": "2021-07-29T14:41:57.666000",
            "method": {
                "name": "StyleMix",
                "model": {
                    "img": 31,
                    "res": 256,
                    "fid": 12,
                    "version": "StyleGan2ADA"
                },
                "row_image": "123",
                "column_image": "123",
                "styles": "Middle",
                "truncation": 1
            }
        },
        {
            "url": "3bf5df238b3741559d9e3806c97f2d33",
            "auth0_id": "google-oauth2|114778200891334419591",
            "creation_date": "2021-07-29T14:41:57.666000",
            "method": {
                "name": "StyleMix",
                "model": {
                    "img": 31,
                    "res": 256,
                    "fid": 12,
                    "version": "StyleGan2ADA"
                },
                "row_image": "123",
                "column_image": "123",
                "styles": "Middle",
                "truncation": 1
            }
        }
    ]
}

const server = setupServer(
  rest.get('http://localhost:8000/api/v1/models/', (req, res, ctx) => {
    return res(
      ctx.json(fakeModelsData),
    )}),
  rest.get('http://localhost:8000/api/v1/user/images', (req, res, ctx) => {
    return res(
      ctx.json(fakeImageData),
    )}),
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())


global.fetch = require("node-fetch");
process.env.GATSBY_AUDIENCE = "http://localhost:8000"

jest.mock("@auth0/auth0-react", () => ({
    withAuthenticationRequired: jest.fn().mockImplementation((component) => component)
}))

const auth0 = require('@auth0/auth0-react');
auth0.useAuth0 = jest.fn().mockReturnValue({ isLoading: false, getAccessTokenSilently: () => {} });



beforeAll(() => {
    server.listen();
})
afterEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())

test('the correct fetching of data', async () => {
    await act(async () => {
        render(<Console />)
    })
    
    expect(await screen.findByText("StyleGan1")).toBeInTheDocument()
    expect(await screen.findByText("StyleGan2ADA")).toBeInTheDocument()
    expect(await screen.findByText("Your Images"))
})

test('the correct working of the UserImages component', async () => {
    await act(async () => {
        render(<Console />)
    })
    
    fireEvent.click(await screen.findByRole("button", {name: ""}))
    expect(screen.getByText("Model: Images 31k, Resolution 256px, FID 12")).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole("button")[2])
    // Two images for the Nav and Background and two from the fetched data
    expect(screen.getAllByRole("img").length).toBe(4)
})