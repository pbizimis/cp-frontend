import React, { useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Method } from '../Method';

describe('Method', () => {
  const getAccessTokenSilentlyStub = () => {};

  const exampleData = {
    generation_method: {
      name: 'Generate',
      description: 'Generate random images or from a certain seed.',
      method_options: [
        {
          type: 'text',
          name: 'Seed',
          place: 3,
          default: '',
        },
      ],
      url: 'http://localhost:8000/api/v1/stylegan2ada/generate',
    },
    stylemix_method: {
      name: 'StyleMix',
      description: 'Style mix different images.',
      method_options: [
        {
          type: 'slider',
          name: 'Truncation',
          place: 5,
          max: 2,
          min: -2,
          step: 0.1,
          default: 1,
        },
      ],
      url: 'http://localhost:8000/api/v1/stylegan2ada/stylemix',
    },
  };

  const mockData = [exampleData.generation_method, exampleData.stylemix_method];

  test('shows that method name and description are displayed correctly', () => {
    // Chosen method is passed as an id that matches the method name
    const id = 'Generate';

    // onClickStub)
    const onClickStub = () => {};

    render(
      <Method
        id={id}
        onClick={onClickStub}
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        methods={mockData}
      />,
    );
    expect(
      screen.getByRole('heading', { name: 'Generate' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Generate random images or from a certain seed.'),
    ).toBeInTheDocument();
  });

  test('shows that the "Close menu" button executes the passed onClick function', () => {
    // Chosen method is passed as an id that matches the method name
    const id = 'Generate';

    // onClick resets the id to return back to the method grid (previous component 'Methods')
    let onClickState = id;
    const onClickMock = () => {
      onClickState = null;
    };

    render(
      <Method
        id={id}
        onClick={onClickMock}
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        methods={mockData}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(onClickState).toBe(null);
  });

  test('shows that the Loading screen is correctly displayed when state is set', () => {
    // Chosen method is passed as an id that matches the method name
    const id = 'Generate';

    const onClickStub = () => {};

    // Mock Form component to access setState functions
    const Form = require('../../Form/Form');
    Form.Form = jest
      .fn()
      .mockImplementation(
        ({
          method, setApiLoading, setApiData, getAccessTokenSilently,
        }) => {
          useEffect(() => {
            setApiLoading(true);
          });
          return <div>Form</div>;
        },
      );

    render(
      <Method
        id={id}
        onClick={onClickStub}
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        methods={mockData}
      />,
    );

    screen.getByText('Loading');
  });

  test('shows that the Image screen is correctly displayed when state is set (one image)', () => {
    // Chosen method is passed as an id that matches the method name
    const id = 'Generate';

    const onClickStub = () => {};

    // Mock object
    const mockApiData = new Object();
    mockApiData.result_image = 'e0e23e248bcd4f5c83cd93a8e253c789';
    mockApiData.url_prefix = 'http://testlocalhost/';

    // Mock Form component to access setState functions
    const Form = require('../../Form/Form');
    Form.Form = jest
      .fn()
      .mockImplementation(
        ({
          method, setApiLoading, setApiData, getAccessTokenSilently,
        }) => {
          useEffect(() => {
            setApiLoading(false);
            setApiData(mockApiData);
          });
          return <div>Form</div>;
        },
      );

    render(
      <Method
        id={id}
        onClick={onClickStub}
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        methods={mockData}
      />,
    );

    screen.getByText('Generated');
    expect(screen.getByRole('img').src).toBe(
      'http://testlocalhost/e0e23e248bcd4f5c83cd93a8e253c789',
    );
  });

  test('shows that the Image screen is correctly displayed when state is set (three images)', () => {
    // Chosen method is passed as an id that matches the method name
    const id = 'Generate';

    const onClickStub = () => {};

    // Mock object
    const mockApiData = new Object();
    mockApiData.result_image = 'id1';
    mockApiData.row_image = 'id2';
    mockApiData.col_image = 'id3';
    mockApiData.url_prefix = 'http://testlocalhost/';

    // Mock Form component to access setState functions
    const Form = require('../../Form/Form');
    Form.Form = jest
      .fn()
      .mockImplementation(
        ({
          method, setApiLoading, setApiData, getAccessTokenSilently,
        }) => {
          useEffect(() => {
            setApiLoading(false);
            setApiData(mockApiData);
          });
          return <div>Form</div>;
        },
      );

    render(
      <Method
        id={id}
        onClick={onClickStub}
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        methods={mockData}
      />,
    );

    screen.getByText('StyleMix Result');
    screen.getByText('Result Image');
    expect(screen.getAllByRole('img')[0].src).toBe('http://testlocalhost/id1');
    screen.getByText('Row Image');
    expect(screen.getAllByRole('img')[1].src).toBe('http://testlocalhost/id2');
    screen.getByText('Column Image');
    expect(screen.getAllByRole('img')[2].src).toBe('http://testlocalhost/id3');
  });
});
