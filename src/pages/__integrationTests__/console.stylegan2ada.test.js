import React from "react"
import {fireEvent, getByAltText, render, screen, waitFor} from '@testing-library/react'
import StyleGan2ADA from '../console/stylegan2ada'
import { act } from 'react-dom/test-utils'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

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

const fakeModelsData = {
    "generation_method": {
        "name": "Generate",
        "description": "Generate random images or from a certain seed.",
        "method_options": [
            {
                "type": "dropdown",
                "name": "Model",
                "place": 1,
                "options": [
                    {
                        "img": 31,
                        "res": 256,
                        "fid": 12,
                        "version": "stylegan2_ada"
                    }
                ],
                "default": 0
            },
            {
                "type": "slider",
                "name": "Truncation",
                "place": 2,
                "max": 2,
                "min": -2,
                "step": 0.1,
                "default": 1
            },
            {
                "type": "text",
                "name": "Seed",
                "place": 3,
                "default": ""
            }
        ],
        "url": "http://localhost:8000/api/v1/stylegan2ada/generate"
    },
    "stylemix_method": {
        "name": "StyleMix",
        "description": "Style mix different images.",
        "method_options": [
            {
                "type": "dropdown",
                "name": "Model",
                "place": 1,
                "options": [
                    {
                        "img": 31,
                        "res": 256,
                        "fid": 12,
                        "version": "stylegan2_ada"
                    }
                ],
                "default": 0
            },
            {
                "type": "seed_or_image",
                "name": "Row_Image",
                "place": 2,
                "default": ""
            },
            {
                "type": "seed_or_image",
                "name": "Column_Image",
                "place": 3,
                "default": ""
            },
            {
                "type": "dropdown",
                "name": "Styles",
                "place": 4,
                "options": [
                    "Coarse",
                    "Middle",
                    "Fine"
                ],
                "default": 1
            },
            {
                "type": "slider",
                "name": "Truncation",
                "place": 5,
                "max": 2,
                "min": -2,
                "step": 0.1,
                "default": 1
            }
        ],
        "url": "http://localhost:8000/api/v1/stylegan2ada/stylemix"
    }
}

const server = setupServer(
  rest.get('http://localhost:8000/api/v1/stylegan2ada/methods', (req, res, ctx) => {
    return res(
      ctx.json(fakeModelsData),
    )}),
    rest.get('http://localhost:8000/api/v1/user/images', (req, res, ctx) => {
    return res(
      ctx.json(fakeImageData),
    )}),
    rest.post('http://localhost:8000/api/v1/stylegan2ada/stylemix', (req, res, ctx) => {
    return res(
      ctx.json({
        "result_image": req.body.truncation,
        "row_image": req.body.row_image,
        "col_image": req.body.column_image,
        "url_prefix": "https://formdata:"
    }),
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
        render(<StyleGan2ADA />)
    })
    
    expect(await screen.findByText("Generate")).toBeInTheDocument()
    expect(await screen.findByText("Generate random images or from a certain seed.")).toBeInTheDocument()
    expect(await screen.findByText("StyleMix")).toBeInTheDocument()
    expect(await screen.findByText("Style mix different images.")).toBeInTheDocument()
})

test('the correct display of the form after clicking', async () => {
    await act(async () => {
        render(<StyleGan2ADA />)
    })

    fireEvent.click(await screen.findByText("Generate"))

    expect(await screen.findByText("Model")).toBeInTheDocument()
    expect(await screen.findByText("Truncation")).toBeInTheDocument()
    expect(await screen.findByText("Seed")).toBeInTheDocument()
})

test('the correct posting of the form data', async () => {
    let containerElement;
    await act(async () => {
        const { container } = render(<StyleGan2ADA />)
        containerElement = container
    })
    fireEvent.click(await screen.findByText("Style mix different images."))

    const ImageSelections = await screen.findAllByRole("button", {name: "Choose from personal collection"})
    fireEvent.click(ImageSelections[0])

    expect(await screen.findByText('Your Images')).toBeInTheDocument()
    expect(await screen.findByText('StyleGan2ADA')).toBeInTheDocument()

    fireEvent.click(containerElement.querySelector('#headlessui-disclosure-button-9'))
    expect(await screen.findByText("Model: Images 31k, Resolution 256px, FID 12")).toBeInTheDocument()
    // Await the animation and click on the new svg button
    const svgButton = await screen.findByRole('button', {name: ""})
    fireEvent.click(svgButton)
    // Await the animation and click on one image
    const selectionImages = await screen.findAllByRole('img')
    fireEvent.click(selectionImages[1])

    // Close the image form
    fireEvent.click(await screen.findByRole('button', {name: "Close"}))
    // Make sure that only the nav image and the new selected image are displayed
    const imgs = await screen.findAllByRole('img')
    expect(imgs.length).toBe(2)
    expect(imgs[0].src).toBe("https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg")
    // undefined part because env is not set
    expect(imgs[1].src).toBe("http://localhost/undefinedc31ad1323ed648feb93cd7398fcf1894")

    const tabs = await screen.findAllByText("Seed")
    fireEvent.click(tabs[1])

    fireEvent.change(screen.getByRole("textbox"), {target: {value: 'New Seed Value'}})

    await act(async () => {
        fireEvent.click(await screen.findByRole('button', {name: "Generate"}))
    })
    expect(await screen.findByText('Column Image'))
    expect((await screen.findAllByText('Row Image')).length).toBe(2)
    expect(await screen.findByText('Result Image'))
    // 3 Result Images and 2 Previous ones
    expect((await screen.findAllByRole('img')).length).toBe(5)

    // For easier access, the sent form data is embedded in the image srcs
    // Truncation value of 1
    expect((await screen.findAllByRole('img'))[2].src).toBe("https://formdata:1/")
    // Row image was selected with id 
    expect((await screen.findAllByRole('img'))[3].src).toBe("https://formdata:c31ad1323ed648feb93cd7398fcf1894")
    // Column image was selected by seed text
    expect((await screen.findAllByRole('img'))[4].src).toBe("https://formdata:New Seed Value")
    
})