import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Form } from '../Form';

describe('Form Building Case 1', () => {
  const setApiLoading = () => {};
  const setApiData = () => {};
  const getAccessTokenSilently = () => {};

  const mockDataForm = {
    method_options: [
      {
        type: 'dropdown',
        name: 'Model',
        place: 1,
        options: [
          {
            img: 31,
            res: 256,
            fid: 12,
            version: 'stylegan2_ada',
          },
          {
            img: 20,
            res: 20,
            fid: 20,
            version: 'stylegan2_ada',
          },
        ],
        default: 0,
      },
      {
        type: 'seed_or_image',
        name: 'Row_Image',
        place: 2,
        default: '',
      },
      {
        type: 'slider',
        name: 'Truncation',
        place: 3,
        max: 1,
        min: 0,
        step: 0.1,
        default: 1,
      },
      {
        type: 'text',
        name: 'Input',
        place: 4,
        default: '',
      },
    ],
    url: 'http://localhost:8000/api/v1/stylegan2ada/stylemix',
  };

  render(
    <Form
      method={mockDataForm}
      setApiData={setApiData}
      setApiLoading={setApiLoading}
      getAccessTokenSilently={getAccessTokenSilently}
    />,
  );
  test('shows that all components included in example data are rendered correctly (label and html)', () => {
    // Labels ensure that components are rednered correctly because of previous unit tests
    // Dropdown
    expect(screen.getByText('Model')).toBeInTheDocument();
    // Seed Or Image (TextInput or Image Selection)
    expect(screen.getByText('Row Image')).toBeInTheDocument();
    // Slider
    expect(screen.getByText('Truncation')).toBeInTheDocument();
    // Text
    expect(screen.getByText('Input')).toBeInTheDocument();
  });
});

describe('Form Building Case 2', () => {
  const setApiLoading = () => {};
  const setApiData = () => {};
  const getAccessTokenSilently = () => {};
  const mockDataForm2 = {
    method_options: [
      {
        type: 'dropdown',
        name: 'NameModel',
        place: 1,
        options: ['Option1', 'Option2'],
        default: 0,
      },
      {
        type: 'seed_or_image',
        name: 'NameRow_Image',
        place: 2,
        default: '',
      },
      {
        type: 'slider',
        name: 'NameTruncation',
        place: 3,
        max: 1,
        min: 0,
        step: 0.1,
        default: 1,
      },
    ],
    url: 'http://localhost:8000/api/v1/stylegan2ada/stylemix',
  };

  test('shows that order of components is changed by the place value', () => {
    render(
      <Form
        method={mockDataForm2}
        setApiData={setApiData}
        setApiLoading={setApiLoading}
        getAccessTokenSilently={getAccessTokenSilently}
      />,
    );

    // Dropdown
    expect(screen.getAllByText(/Name/)[0].innerHTML).toBe('NameModel');
    // Seed Or Image (TextInput or Image Selection)
    expect(screen.getAllByText(/Name/)[1].innerHTML).toBe('NameRow Image');
    // Slider
    expect(screen.getAllByText(/Name/)[2].innerHTML).toBe('NameTruncation');
  });

  test('shows that order of components is changed by the place value', () => {
    mockDataForm2.method_options[0].place = 3; // Dropdown first
    mockDataForm2.method_options[1].place = 1; // Text second
    mockDataForm2.method_options[2].place = 2; // Slider third
    render(
      <Form
        method={mockDataForm2}
        setApiData={setApiData}
        setApiLoading={setApiLoading}
        getAccessTokenSilently={getAccessTokenSilently}
      />,
    );

    // Dropdown
    expect(screen.getAllByText(/Name/)[2].innerHTML).toBe('NameModel');
    // Seed Or Image (TextInput or Image Selection)
    expect(screen.getAllByText(/Name/)[0].innerHTML).toBe('NameRow Image');
    // Slider
    expect(screen.getAllByText(/Name/)[1].innerHTML).toBe('NameTruncation');
  });
});

describe('Form API Logic', () => {
  const getAccessTokenSilently = () => {};
  const mockDataForm = {
    method_options: [
      {
        type: 'dropdown',
        name: 'Model',
        place: 1,
        options: [
          {
            img: 31,
            res: 256,
            fid: 12,
            version: 'stylegan2_ada',
          },
          {
            img: 20,
            res: 20,
            fid: 20,
            version: 'stylegan2_ada',
          },
        ],
        default: 0,
      },
      {
        type: 'seed_or_image',
        name: 'Row_Image',
        place: 2,
        default: '',
      },
      {
        type: 'slider',
        name: 'Truncation',
        place: 3,
        max: 1,
        min: 0,
        step: 0.1,
        default: 1,
      },
      {
        type: 'text',
        name: 'Input',
        place: 4,
        default: '',
      },
    ],
    url: 'http://localhost:8000/api/v1/stylegan2ada/stylemix',
  };
  test('shows that form default values are sent correctly', async () => {
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((data, ...args) => ({ data }));

    let setApiDataValue;

    const setApiLoadingMock = () => {};
    const setApiDataMock = (value) => {
      setApiDataValue = value;
    };

    render(
      <Form
        method={mockDataForm}
        setApiData={setApiDataMock}
        setApiLoading={setApiLoadingMock}
        getAccessTokenSilently={getAccessTokenSilently}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Generate'));
    });

    // assert that data sent to api is
    expect(setApiDataValue).toStrictEqual({
      model: {
        img: 31, res: 256, fid: 12, version: 'stylegan2_ada',
      },
      row_image: undefined,
      truncation: 1,
      input: '',
    });
  });

  test('shows that form sets state correctly', async () => {
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((data, ...args) => ({ data }));

    const setApiLoadingValues = [];

    const setApiLoadingMock = (value) => {
      setApiLoadingValues.push(value);
    };
    const setApiDataMock = () => {};

    render(
      <Form
        method={mockDataForm}
        setApiData={setApiDataMock}
        setApiLoading={setApiLoadingMock}
        getAccessTokenSilently={getAccessTokenSilently}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Generate'));
    });

    // assert that loading value was true and then false
    expect(setApiLoadingValues).toStrictEqual([true, false]);
  });

  test('shows form values can be changed and are sent correctly', async () => {
    const useApi = require('../../../utils/use-api');
    useApi.postApi = jest.fn().mockImplementation((data, ...args) => ({ data }));

    const setApiLoadingValues = [];
    let setApiDataValue;

    const setApiLoadingMock = (value) => {
      setApiLoadingValues.push(value);
    };
    const setApiDataMock = (value) => {
      setApiDataValue = value;
    };

    render(
      <Form
        method={mockDataForm}
        setApiData={setApiDataMock}
        setApiLoading={setApiLoadingMock}
        getAccessTokenSilently={getAccessTokenSilently}
      />,
    );

    // Change dropdown value
    fireEvent.click(
      screen.getByText('Model (31k images, Resolution 256, FID 12)'),
    );
    fireEvent.click(
      screen.getByText('Model (20k images, Resolution 20, FID 20)'),
    );
    // Change seed value
    fireEvent.click(screen.getByText('Seed'));
    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: 'newseed' },
    });
    // Change text input
    fireEvent.change(screen.getAllByRole('textbox')[1], {
      target: { value: 'newtext' },
    });

    await act(async () => {
      // Submit
      fireEvent.click(screen.getByText('Generate'));
    });

    // assert that data sent to api is
    expect(setApiDataValue).toStrictEqual({
      model: {
        img: 20, res: 20, fid: 20, version: 'stylegan2_ada',
      },
      row_image: 'newseed',
      truncation: 1,
      input: 'newtext',
    });
  });
});
