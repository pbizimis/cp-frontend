import React from "react"
import { fireEvent, render, screen } from "@testing-library/react";
import { sortImages, ModelOverview, VersionOverview, UserImages } from "../UserImages";
import { act } from "react-dom/test-utils";


test('that sortImages function sorts the raw image data by stylegan version and model version', () => {
    const sortImagesData = {
        "image_url_prefix": "https://images.webdesigan.com/",
        "image_ids": [
            {
                "url": "c31ad1323ed648feb93cd7398fcf1894",
                "auth0_id": "google-oauth2|114778200891334419591",
                "creation_date": "2021-07-29T14:41:57.666000",
                "method": {
                    "name": "StyleMix",
                    "model": {
                        "img": 10,
                        "res": 10,
                        "fid": 10,
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
                        "img": 10,
                        "res": 10,
                        "fid": 10,
                        "version": "StyleGan2ADA"
                    },
                    "row_image": "123",
                    "column_image": "123",
                    "styles": "Middle",
                    "truncation": 1
                }
            },
            {
                "url": "eacd935a2a7640d5accf8257f3aa00ed",
                "auth0_id": "google-oauth2|114778200891334419591",
                "creation_date": "2021-07-29T14:41:57.666000",
                "method": {
                    "name": "StyleMix",
                    "model": {
                        "img": 20,
                        "res": 20,
                        "fid": 20,
                        "version": "StyleGan2ADA"
                    },
                    "row_image": "123",
                    "column_image": "123",
                    "styles": "Middle",
                    "truncation": 1
                }
            },
            {
                "url": "ea7971e5decc45269ef98a17884f3137",
                "auth0_id": "google-oauth2|114778200891334419591",
                "creation_date": "2021-07-29T12:55:11.594000",
                "method": {
                    "name": "Generation",
                    "model": {
                        "img": 10,
                        "res": 10,
                        "fid": 10,
                        "version": "StyleGan1"
                    },
                    "truncation": 1,
                    "seed": ""
                }
            }
        ]
    }
    const assertionSortImagesData = {
        "StyleGan2ADA": {
            "Images 10k, Resolution 10px, FID 10": [
                {
                    "url": "c31ad1323ed648feb93cd7398fcf1894",
                    "auth0_id": "google-oauth2|114778200891334419591",
                    "creation_date": "2021-07-29T14:41:57.666000",
                    "method": {
                        "name": "StyleMix",
                        "model": {
                            "img": 10,
                            "res": 10,
                            "fid": 10,
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
                            "img": 10,
                            "res": 10,
                            "fid": 10,
                            "version": "StyleGan2ADA"
                        },
                        "row_image": "123",
                        "column_image": "123",
                        "styles": "Middle",
                        "truncation": 1
                    }
                }
            ],
            "Images 20k, Resolution 20px, FID 20": [
                {
                    "url": "eacd935a2a7640d5accf8257f3aa00ed",
                    "auth0_id": "google-oauth2|114778200891334419591",
                    "creation_date": "2021-07-29T14:41:57.666000",
                    "method": {
                        "name": "StyleMix",
                        "model": {
                            "img": 20,
                            "res": 20,
                            "fid": 20,
                            "version": "StyleGan2ADA"
                        },
                        "row_image": "123",
                        "column_image": "123",
                        "styles": "Middle",
                        "truncation": 1
                    }
                }
            ]
        },
        "StyleGan1": {
            "Images 10k, Resolution 10px, FID 10": [
                {
                    "url": "ea7971e5decc45269ef98a17884f3137",
                    "auth0_id": "google-oauth2|114778200891334419591",
                    "creation_date": "2021-07-29T12:55:11.594000",
                    "method": {
                        "name": "Generation",
                        "model": {
                            "img": 10,
                            "res": 10,
                            "fid": 10,
                            "version": "StyleGan1"
                        },
                        "truncation": 1,
                        "seed": ""
                    }
                }
            ]
        }
    }

    const result = sortImages(sortImagesData);
    expect(result).toStrictEqual(assertionSortImagesData)
  })


const mockModelData = [
    {
        "url": "c31ad1323ed648feb93cd7398fcf1894",
        "auth0_id": "google-oauth2|114778200891334419591",
        "creation_date": "2021-07-29T14:41:57.666000",
        "method": {
            "name": "StyleMix",
            "model": {
                "img": 10,
                "res": 10,
                "fid": 10,
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
                "img": 10,
                "res": 10,
                "fid": 10,
                "version": "StyleGan2ADA"
            },
            "row_image": "123",
            "column_image": "123",
            "styles": "Middle",
            "truncation": 1
        }
    }
]

// radio false
test('that version name is displayed', () => {
    render(<ModelOverview modelName={"Model Version 1"} modelData={mockModelData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    expect(screen.getByText("Model: Model Version 1")).toBeInTheDocument()
})

test('that no images are displayed in default state', () => {
    render(<ModelOverview modelName={"Model Version 1"} modelData={mockModelData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    
    expect(screen.queryAllByRole("img").length).toBe(0)
})

test('that two images are displayed in default state (because of two images in data)', () => {
    render(<ModelOverview modelName={"Model Version 1"} modelData={mockModelData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    
    fireEvent.click(screen.getByRole("button"))

    expect(screen.getAllByRole("img").length).toBe(2)

    // next click hides images again
    fireEvent.click(screen.getByRole("button"))

    expect(screen.queryAllByRole("img").length).toBe(0)
})

test('that images have the correct src value', () => {
    render(<ModelOverview modelName={"Model Version 1"} modelData={mockModelData} urlPrefix={"http://testlocalhost/"} onChange={() => {}} radioForm={false} />)
    
    fireEvent.click(screen.getByRole("button"))

    expect(screen.getAllByRole("img")[0].src).toBe("http://testlocalhost/c31ad1323ed648feb93cd7398fcf1894")
    expect(screen.getAllByRole("img")[1].src).toBe("http://testlocalhost/3bf5df238b3741559d9e3806c97f2d33")
})

// radio true (makes images act as radio buttons that can be selected)

test('that images are clickable and change the onClick function', () => {

    let onChangeValue;
    render(<ModelOverview modelName={"Model Version 1"} modelData={mockModelData} urlPrefix={"urlPrefix"} onChange={(e) => {onChangeValue = e}} radioForm={true} />)
    fireEvent.click(screen.getByRole("button"))

    // Click on one image
    fireEvent.click(screen.getAllByRole("img")[0])
    expect(onChangeValue).toBe("c31ad1323ed648feb93cd7398fcf1894")

    // Click on the other
    fireEvent.click(screen.getAllByRole("img")[1])
    expect(onChangeValue).toBe("3bf5df238b3741559d9e3806c97f2d33")
})

// VersionOverview

const mockVersionData = {
    "Images 20k, Resolution 20px, FID 20": [
        {
            "url": "url1",
        },
    ],
    "Images 30k, Resolution 30px, FID 30": [
        {
            "url": "url2",
        },
    ],
}

test('that version name is displayed', () => {
    render(<VersionOverview versionName={"Version1.0"} versionData={mockVersionData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    expect(screen.getByText("Version1.0")).toBeInTheDocument()
})

test('that no models are displayed in default state', () => {
    render(<VersionOverview versionName={"Version1.0"} versionData={mockVersionData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    
    expect(screen.queryByText("Model: Images 20k, Resolution 20px, FID 20")).not.toBeInTheDocument()
    expect(screen.queryByText("Model: Images 30k, Resolution 30px, FID 30")).not.toBeInTheDocument()
})

test('that models are displayed after the button click', () => {
    render(<VersionOverview versionName={"Version1.0"} versionData={mockVersionData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    
    fireEvent.click(screen.getByRole("button"))

    expect(screen.getByText("Model: Images 20k, Resolution 20px, FID 20")).toBeInTheDocument()
    expect(screen.getByText("Model: Images 30k, Resolution 30px, FID 30")).toBeInTheDocument()
})

test('that models are not displayed after the second button click (close)', () => {
    render(<VersionOverview versionName={"Version1.0"} versionData={mockVersionData} urlPrefix={"urlPrefix"} onChange={() => {}} radioForm={false} />)
    
    fireEvent.click(screen.getByRole("button"))
    fireEvent.click(screen.getAllByRole("button")[0])

    expect(screen.queryByText("Model: Images 20k, Resolution 20px, FID 20")).not.toBeInTheDocument()
    expect(screen.queryByText("Model: Images 30k, Resolution 30px, FID 30")).not.toBeInTheDocument()
})

// UserImages

const mockUserImagesData = {
    "error": null,
    "data": {
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
                "url": "c31ad1323ed648feb93cd7398fcf1894",
                "auth0_id": "google-oauth2|114778200891334419591",
                "creation_date": "2021-07-29T14:41:57.666000",
                "method": {
                    "name": "StyleMix",
                    "model": {
                        "img": 31,
                        "res": 256,
                        "fid": 12,
                        "version": "StyleGan1ADA"
                    },
                    "row_image": "123",
                    "column_image": "123",
                    "styles": "Middle",
                    "truncation": 1
                }
            }
        ]
    }
}

test('that the label text is displayed', async () => {

    // Mock fetchData request
    const useApi = require('../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return mockUserImagesData});

    await act(async () => {
        render(<UserImages onChange={() => {}} radioForm={false} />)
    })
    expect(screen.getByText("Your Images")).toBeInTheDocument()
})

test('that the model labels are displayed in default state and two button svgs are rendered', async () => {

    // Mock fetchData request
    const useApi = require('../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return mockUserImagesData});

    let containerElement;
    await act(async () => {
        let { container } = render(<UserImages onChange={() => {}} radioForm={false} />)
        containerElement = container;
    })

    expect(screen.getByText("StyleGan2ADA")).toBeInTheDocument()
    expect(screen.getByText("StyleGan1ADA")).toBeInTheDocument()
    expect(containerElement.querySelectorAll("svg").length).toBe(2)
})

test('that the loading circle is rendered when api data is fetched', async () => {

    // Mock fetchData request
    const useApi = require('../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((...args) => {return {"error": null, "data": null}});

    let containerElement;
    await act(async () => {
        let { container } = render(<UserImages onChange={() => {}} radioForm={false} />)
        containerElement = container;
    })

    // No text elements
    expect(screen.queryAllByText(/StyleGan/i).length).toBe(0)
    // One loading svg
    expect(containerElement.querySelectorAll("svg").length).toBe(1)
})