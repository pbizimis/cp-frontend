import React, { useEffect } from "react"
import {fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Methods, Method } from '../Methods';
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const exampleData = {
    "generation_method": {
        "name": "Generate",
        "description": "Generate random images or from a certain seed.",
        "method_options": [
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
};

const getAccessTokenSilentlyStub = () => {};

test('shows that a loading svg is displayed when data is null', () => {
    const { container } = render(<Methods getAccessTokenSilently={getAccessTokenSilentlyStub} data={null} url_prefix={"urlPrefix"} />)
    expect(container.querySelectorAll("svg").length).toBe(1);
})

test('shows that methods are shown correclty according to the data', () => {
    const { container } = render(<Methods getAccessTokenSilently={getAccessTokenSilentlyStub} data={exampleData} url_prefix={"urlPrefix"} />)
    
    // Assert two svgs to be on the screen (one of each method)
    expect(container.querySelectorAll("svg").length).toBe(2);
    // Assert that first method's name and description are shown
    expect(screen.getByText("Generate")).toBeInTheDocument();
    expect(screen.getByText("Generate random images or from a certain seed.")).toBeInTheDocument();
    // Assert that second method's name and description are shown
    expect(screen.getByText("StyleMix")).toBeInTheDocument();
    expect(screen.getByText("Style mix different images.")).toBeInTheDocument();
    
    // Assert that no form buttons are on the screen
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
})

test('shows that form opens when clicked on a method (StyleMix)', () => {
    const { container } = render(<Methods getAccessTokenSilently={getAccessTokenSilentlyStub} data={exampleData} url_prefix={"urlPrefix"} />)
    
    fireEvent.click(screen.getByText("StyleMix"));

    // Assert that form submit button is rendered
    expect(screen.getByRole("button", {name: "Generate"})).toBeInTheDocument();
    // Assert that slider of form is rendered
    expect(screen.getByRole("slider")).toBeInTheDocument();
    
    // Assert that text input of other method is NOT rendered
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
})

test('shows that form opens when clicked on a method (Generate)', () => {
    const { container } = render(<Methods getAccessTokenSilently={getAccessTokenSilentlyStub} data={exampleData} url_prefix={"urlPrefix"} />)
    
    fireEvent.click(screen.getByText("Generate"));

    // Assert that form submit button is rendered
    expect(screen.getByRole("button", {name: "Generate"})).toBeInTheDocument();
    // Assert that slider of form is rendered
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    
    // Assert that text input of other method is NOT rendered
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
})

test('shows that form closes', async () => {
    render(<Methods getAccessTokenSilently={getAccessTokenSilentlyStub} data={exampleData} url_prefix={"urlPrefix"} />)
    
    fireEvent.click(screen.getByText("Generate"));

    // Assert that form submit button is rendered
    expect(screen.getByRole("button", {name: "Generate"})).toBeInTheDocument();

    // Close the menu
    fireEvent.click(screen.getByRole("button", {name: "Close menu"}));

    // Wait until animation finishes and elements are removed (fails if not removed)
    await waitFor(() => {
        expect(screen.queryByText('Seed')).not.toBeInTheDocument()
        expect(screen.queryByRole("button", {name: "Generate"})).not.toBeInTheDocument()
      })
})

// METHOD

const exampleData2 = [exampleData.generation_method, exampleData.stylemix_method]

test('shows that method name and description are displayed correctly', () => {

    // Chosen method is passed as an id that matches the method name
    const id = "Generate";

    // onClickStub)
    const onClickStub = () => {};

    render(<Method id={id} onClick={onClickStub} getAccessTokenSilently={getAccessTokenSilentlyStub} methods={exampleData2} />)
    expect(screen.getByRole("heading", {name: "Generate"})).toBeInTheDocument();
    expect(screen.getByText("Generate random images or from a certain seed.")).toBeInTheDocument();
})

test('shows that the "Close menu" button executes the passed onClick function', () => {

    // Chosen method is passed as an id that matches the method name
    const id = "Generate";

    // onClick resets the id to return back to the method grid (previous component 'Methods')
    let onClickState = id;
    const onClickMock = () => {onClickState = null};

    render(<Method id={id} onClick={onClickMock} getAccessTokenSilently={getAccessTokenSilentlyStub} methods={exampleData2} />)

    fireEvent.click(screen.getByRole("button", {name: "Close menu"}));
    expect(onClickState).toBe(null)
})

test('shows that the Loading screen is correctly displayed when state is set', () => {

    // Chosen method is passed as an id that matches the method name
    const id = "Generate";

    const onClickStub = () => {};

    // Mock Form component to access setState functions
    const Form = require('../Form');
    Form.Form = jest.fn().mockImplementation(
        ({method, setApiLoading, setApiData, getAccessTokenSilently}) => {
        useEffect(() => {
            setApiLoading(true);
        })
        return <div>Form</div>});

    render(<Method id={id} onClick={onClickStub} getAccessTokenSilently={getAccessTokenSilentlyStub} methods={exampleData2} />)

    screen.getByText("Loading")
})

test('shows that the Image screen is correctly displayed when state is set (one image)', () => {

    // Chosen method is passed as an id that matches the method name
    const id = "Generate";

    const onClickStub = () => {};

    // Mock object
    const mockApiData = new Object();
    mockApiData["result_image"] = "e0e23e248bcd4f5c83cd93a8e253c789"
    mockApiData["url_prefix"] = "http://testlocalhost/"

    // Mock Form component to access setState functions
    const Form = require('../Form');
    Form.Form = jest.fn().mockImplementation(
        ({method, setApiLoading, setApiData, getAccessTokenSilently}) => {
        useEffect(() => {
            setApiLoading(false);
            setApiData(mockApiData);
        })
        return <div>Form</div>});

    render(<Method id={id} onClick={onClickStub} getAccessTokenSilently={getAccessTokenSilentlyStub} methods={exampleData2} />)

    screen.getByText("Generated")
    expect(screen.getByRole("img").src).toBe("http://testlocalhost/e0e23e248bcd4f5c83cd93a8e253c789")
})

test('shows that the Image screen is correctly displayed when state is set (three images)', () => {

    // Chosen method is passed as an id that matches the method name
    const id = "Generate";

    const onClickStub = () => {};

    // Mock object
    const mockApiData = new Object();
    mockApiData["result_image"] = "id1"
    mockApiData["row_image"] = "id2"
    mockApiData["col_image"] = "id3"
    mockApiData["url_prefix"] = "http://testlocalhost/"

    // Mock Form component to access setState functions
    const Form = require('../Form');
    Form.Form = jest.fn().mockImplementation(
        ({method, setApiLoading, setApiData, getAccessTokenSilently}) => {
        useEffect(() => {
            setApiLoading(false);
            setApiData(mockApiData);
        })
        return <div>Form</div>});

    render(<Method id={id} onClick={onClickStub} getAccessTokenSilently={getAccessTokenSilentlyStub} methods={exampleData2} />)

    screen.getByText("StyleMix Result")
    screen.getByText("Result Image")
    expect(screen.getAllByRole("img")[0].src).toBe("http://testlocalhost/id1")
    screen.getByText("Row Image")
    expect(screen.getAllByRole("img")[1].src).toBe("http://testlocalhost/id2")
    screen.getByText("Column Image")
    expect(screen.getAllByRole("img")[2].src).toBe("http://testlocalhost/id3")
})