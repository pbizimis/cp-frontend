import React from "react"
import {render, fireEvent, screen} from '@testing-library/react'
import { classNames, Dropdown, Slider, Text, UserImagesDisclosure, ToggleTextOrImage, Form } from '../Form';
import { useForm } from "react-hook-form"
import { act } from "react-dom/test-utils";

// classNames()

test('that class names are combined', () => {
  const classStringOne = "border-indigo-500 text-indigo-600"
  const classStringTwo = "whitespace-nowrap py-4"

  expect(classNames(classStringOne, classStringTwo)).toBe("border-indigo-500 text-indigo-600 whitespace-nowrap py-4")
})

// DROPDOWN

const exampleDataDropdown1={
    "type": "dropdown",
    "name": "Model",
    "place": 1,
    "options": [
        {
            "img": 1,
            "res": 1,
            "fid": 1,
            "version": "stylegan2_ada"
        },
        {
            "img": 2,
            "res": 2,
            "fid": 2,
            "version": "stylegan2_ada"
        }
    ],
    "default": 0
}

const MockFormDropdown1 = () => {
    const { control } = useForm()
    return <Dropdown data={exampleDataDropdown1} control={control}/>
  };

test('shows only the default option in the dropdown and the name of the dropdown', () => {

    render(<MockFormDropdown1 />)
    
    expect(screen.getByText(exampleDataDropdown1.name)).toBeInTheDocument()
    expect(screen.getByText("Model (1k images, Resolution 1, FID 1)")).toBeInTheDocument()
    expect(screen.queryByText("Model (2k images, Resolution 2, FID 2)")).not.toBeInTheDocument()

})

test('shows all options and the dropdown name when clicked', () => {

    render(<MockFormDropdown1 />)
    
    // simulate a click on the dropdown
    fireEvent.click(screen.getByRole("button"))
    
    expect(screen.getByText(exampleDataDropdown1.name)).toBeInTheDocument()
    expect(screen.getAllByText("Model (1k images, Resolution 1, FID 1)").length == 2)
    expect(screen.getByText("Model (2k images, Resolution 2, FID 2)")).toBeInTheDocument()
})

// DROPDOWN 2 (not a model)

const exampleDataDropdown2={
    "type": "dropdown",
    "name": "SomeValues",
    "place": 1,
    "options": [
        "Option1",
        "Option2"
    ],
    "default": 0
}

const MockFormDropdown2 = () => {
    const { control } = useForm()
    return <Dropdown data={exampleDataDropdown2} control={control}/>
  };

test('shows only the default option in the dropdown and the name of the dropdown', () => {

    render(<MockFormDropdown2 />)
    
    expect(screen.getByText(exampleDataDropdown2.name)).toBeInTheDocument()
    expect(screen.getByText("Option1")).toBeInTheDocument()
    expect(screen.queryByText("Option2")).not.toBeInTheDocument()

})

// SLIDER
// https://next.material-ui.com/guides/testing/

const exampleDataSlider={
    "type": "dropdown",
    "name": "Truncation",
    "place": 1,
    "max": 2,
    "min": -2,
    "step": 0.1,
    "default": 1
}

const MockFormSlider = () => {
    const { control } = useForm();
    return <Slider data={exampleDataSlider} control={control}/>;
  };

test('shows slider label', () => {

    render(<MockFormSlider />)
    
    expect(screen.getByText(exampleDataSlider.name)).toBeInTheDocument()

})

test('shows slider values are based on input', () => {

    render(<MockFormSlider />)

    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("slider").getAttribute("aria-valuemax")).toBe("2");
    expect(screen.getByRole("slider").getAttribute("aria-valuenow")).toBe("1");
    expect(screen.getByRole("slider").getAttribute("aria-valuemin")).toBe("-2");
})

test('shows slider steps are rendered correctly', () => {

    render(<MockFormSlider />)

    let totalSteps = 0
    screen.queryAllByText('').map(node => {
        if (node.getAttribute("data-index")) {
            totalSteps++;
        }
    });
    let totalRange = Math.abs(exampleDataSlider["max"] - exampleDataSlider["min"])
    // -2 because the selector circle of the slider has a data-index and the 0th element
    let step = totalRange / (totalSteps - 2);
    expect(step).toBe(exampleDataSlider.step)
})

// TEXT

const exampleDataText={
    "type": "text",
    "name": "NameSlider",
    "default": "defaultValue"
}

const MockFormText = () => {
    const { control } = useForm();
    return <Text data={exampleDataText} control={control}/>;
  };

test('shows text label', () => {

    render(<MockFormText />)
    
    expect(screen.getByText(exampleDataText.name)).toBeInTheDocument()

})

test('shows that data is in textfield', () => {

    render(<MockFormText />)
    
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox").getAttribute("value")).toBe(exampleDataText.default)

})

// USERIMAGESDISCLOSURE

test('shows text when no image is selected', () => {

    const onChange = () => {}; //Stub onChange function

    render(<UserImagesDisclosure currentImage={""} onChange={onChange} radioForm={true} />)
    expect(screen.getByText("Choose from personal collection")).toBeInTheDocument()

})

test('shows image when image is selected', () => {

    const onChange = () => {}; //Stub onChange function

    let envUrl = "http://somelocalhost";
    let imageId = "imageid";
    process.env.GATSBY_IMAGE_BUCKET = envUrl;

    render(<UserImagesDisclosure currentImage={imageId} onChange={onChange} radioForm={true} />)
    // assert that chosen image has a src that combines the env variable with the current image id
    let image = screen.getByAltText("")
    expect(image).toBeInTheDocument()
    expect(image.src).toBe(envUrl+imageId+"/")

})

test('shows disclosure opens and closes with button presses', async () => {

    let value = false;

    const UserImages = require('../UserImages');
    UserImages.UserImages = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);

    const onChange = () => {}; //Stub onChange function


    render(<UserImagesDisclosure currentImage={value} onChange={onChange} radioForm={true} />)
    expect(screen.getByText("Choose from personal collection")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button"))

    // Assert that the UserImages component is displayed (here with a mock value)
    expect(screen.getByText("This is a mock!")).toBeInTheDocument()

    // click on the close button
    fireEvent.click(screen.getByText("Close"))

    // assert that no image is shown
    expect(screen.getByText("Choose from personal collection")).toBeInTheDocument()
})

test('shows disclosure opens and closes with button presses when image is chosen', async () => {

    let envUrl = "http://somelocalhost";
    let imageId = "imageid";
    process.env.GATSBY_IMAGE_BUCKET = envUrl;

    // Mock used component
    const UserImages = require('../UserImages');
    UserImages.UserImages = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);

    const onChange = () => {}; //Stub onChange function


    render(<UserImagesDisclosure currentImage={imageId} onChange={onChange} radioForm={true} />)

    let image = screen.getByAltText("")
    expect(image).toBeInTheDocument()
    expect(image.src).toBe(envUrl+imageId+"/")

    fireEvent.click(screen.getByRole("button"))

    // Assert that the UserImages component is displayed (here with a mock value)
    expect(screen.getByText("This is a mock!")).toBeInTheDocument()

    // click on the close button
    fireEvent.click(screen.getByText("Close"))

    // assert that image is shown
    expect(image).toBeInTheDocument()
    expect(image.src).toBe(envUrl+imageId+"/")
})

// ToggleTextOrImage

const exampleDataToggleTextOrImage = {
    "name": "Row_Image",
    "default": ""
}

const MockFormToggleTextOrImage = () => {
    const { control } = useForm();
    const reset = (stub1, stub2) => {};
    return <ToggleTextOrImage data={exampleDataToggleTextOrImage} control={control} reset={reset} />;
};

test('shows label of component from data', () => {

    render(<MockFormToggleTextOrImage />)
    expect(screen.getByText("Row Image")).toBeInTheDocument()

})

test('shows click behavior of toggle', () => {

    render(<MockFormToggleTextOrImage />)

    // Assert that default is the button for personal images
    expect(screen.getByText("Choose from personal collection")).toBeInTheDocument()
    
    // Open the tab for Seed Input
    fireEvent.click(screen.getByText("Seed"))
    
    // Assert that a text field is open
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    // And the button for personal images is hidden
    expect(screen.queryByText("Choose from personal collection")).not.toBeInTheDocument()

    // Open the tab for Images again
    fireEvent.click(screen.getByText("Image"))

    // Assert that a text field is closed
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    // And the button for personal images is hidden
    expect(screen.getByText("Choose from personal collection")).toBeInTheDocument()
})

// FORM Building

// cunction stubs
const setApiLoading = () => {};
const setApiData = () => {};
const getAccessTokenSilently = () => {};

// data mock
const exampleDataForm = {
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
                },
                {
                    "img": 20,
                    "res": 20,
                    "fid": 20,
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
            "type": "slider",
            "name": "Truncation",
            "place": 3,
            "max": 1,
            "min": 0,
            "step": 0.1,
            "default": 1
        },
        {
            "type": "text",
            "name": "Input",
            "place": 4,
            "default": ""
        },
    ],
    "url": "http://localhost:8000/api/v1/stylegan2ada/stylemix"
}

test('shows that all components included in example data are rendered correctly (label and html)', () => {

    render(<Form method={exampleDataForm} setApiData={setApiData} setApiLoading={setApiLoading} getAccessTokenSilently={getAccessTokenSilently} />)

    // Labels ensure that components are rednered correctly because of previous unit tests
    // Dropdown
    expect(screen.getByText("Model")).toBeInTheDocument()
    // Seed Or Image (TextInput or Image Selection)
    expect(screen.getByText("Row Image")).toBeInTheDocument()
    // Slider
    expect(screen.getByText("Truncation")).toBeInTheDocument()
    // Text
    expect(screen.getByText("Input")).toBeInTheDocument()

})

// data mock
const exampleDataForm2 = {
    "method_options": [
        {
            "type": "dropdown",
            "name": "NameModel",
            "place": 2,
            "options": [
                "Option1",
                "Option2"
            ],
            "default": 0
        },
        {
            "type": "seed_or_image",
            "name": "NameRow_Image",
            "place": 1,
            "default": ""
        },
        {
            "type": "slider",
            "name": "NameTruncation",
            "place": 3,
            "max": 1,
            "min": 0,
            "step": 0.1,
            "default": 1
        }
    ],
    "url": "http://localhost:8000/api/v1/stylegan2ada/stylemix"
}

test('shows that order of components is changed by the place value', () => {

    exampleDataForm2.method_options[0].place = 1 // Dropdown first
    exampleDataForm2.method_options[1].place = 2 // Text second
    exampleDataForm2.method_options[2].place = 3 // Slider third
    render(<Form method={exampleDataForm2} setApiData={setApiData} setApiLoading={setApiLoading} getAccessTokenSilently={getAccessTokenSilently} />)

    // Dropdown
    expect(screen.getAllByText(/Name/)[0].innerHTML).toBe("NameModel")
    // Seed Or Image (TextInput or Image Selection)
    expect(screen.getAllByText(/Name/)[1].innerHTML).toBe("NameRow Image")
    // Slider
    expect(screen.getAllByText(/Name/)[2].innerHTML).toBe("NameTruncation")

})

test('shows that order of components is changed by the place value', () => {

    exampleDataForm2.method_options[0].place = 3 // Dropdown first
    exampleDataForm2.method_options[1].place = 1 // Text second
    exampleDataForm2.method_options[2].place = 2 // Slider third
    render(<Form method={exampleDataForm2} setApiData={setApiData} setApiLoading={setApiLoading} getAccessTokenSilently={getAccessTokenSilently} />)

    // Dropdown
    expect(screen.getAllByText(/Name/)[2].innerHTML).toBe("NameModel")
    // Seed Or Image (TextInput or Image Selection)
    expect(screen.getAllByText(/Name/)[0].innerHTML).toBe("NameRow Image")
    // Slider
    expect(screen.getAllByText(/Name/)[1].innerHTML).toBe("NameTruncation")

})

// FORM Logic (API and Submit)

test('shows that form default values are sent correctly', async () => {

    const useApi = require('../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((data, ...args) => {return {"data": data}});

    let setApiDataValue;

    let setApiLoadingMock = () => {};
    let setApiDataMock = (value) => {setApiDataValue = value};

    render(<Form method={exampleDataForm} setApiData={setApiDataMock} setApiLoading={setApiLoadingMock} getAccessTokenSilently={getAccessTokenSilently} />)
    
    await act(async () => {
        fireEvent.click(screen.getByText("Generate"))
    })

    // assert that data sent to api is
    expect(setApiDataValue).toStrictEqual({
        model: { img: 31, res: 256, fid: 12, version: 'stylegan2_ada' },
        row_image: undefined,
        truncation: 1,
        input: ''
      });

})

test('shows that form sets state correctly', async () => {

    const useApi = require('../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((data, ...args) => {return {"data": data}});

    let setApiLoadingValues = [];

    let setApiLoadingMock = (value) => {setApiLoadingValues.push(value)};
    let setApiDataMock = () => {};

    render(<Form method={exampleDataForm} setApiData={setApiDataMock} setApiLoading={setApiLoadingMock} getAccessTokenSilently={getAccessTokenSilently} />)
    
    await act(async () => {
        fireEvent.click(screen.getByText("Generate"))
    })

    // assert that loading value was true and then false
    expect(setApiLoadingValues).toStrictEqual([true, false]);

})

test('shows form values can be changed and are sent correctly', async () => {

    const useApi = require('../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((data, ...args) => {return {"data": data}});

    let setApiLoadingValues = [];
    let setApiDataValue;

    let setApiLoadingMock = (value) => {setApiLoadingValues.push(value)};
    let setApiDataMock = (value) => {setApiDataValue = value};

    render(<Form method={exampleDataForm} setApiData={setApiDataMock} setApiLoading={setApiLoadingMock} getAccessTokenSilently={getAccessTokenSilently} />)
    
    // Change dropdown value
    fireEvent.click(screen.getByText("Model (31k images, Resolution 256, FID 12)"))
    fireEvent.click(screen.getByText("Model (20k images, Resolution 20, FID 20)"))
    // Change seed value
    fireEvent.click(screen.getByText("Seed"))
    fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: 'newseed'}})
    // Change text input
    fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: 'newtext'}})

    await act(async () => {
        // Submit
        fireEvent.click(screen.getByText("Generate"))
    })
    
    // assert that data sent to api is
    expect(setApiDataValue).toStrictEqual({
        model: { img: 20, res: 20, fid: 20, version: 'stylegan2_ada' },
        row_image: 'newseed',
        truncation: 1,
        input: 'newtext'
      });

})