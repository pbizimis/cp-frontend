import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { Methods } from '../Methods';

describe('Methods', () => {
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

  const getAccessTokenSilentlyStub = () => {};

  test('shows that a loading svg is displayed when data is null', () => {
    const { container } = render(
      <Methods
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        data={null}
        url_prefix="urlPrefix"
      />,
    );
    expect(container.querySelectorAll('svg').length).toBe(1);
  });

  test('shows that methods are shown correclty according to the data', () => {
    const { container } = render(
      <Methods
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        data={exampleData}
        url_prefix="urlPrefix"
      />,
    );

    // Assert two svgs to be on the screen (one of each method)
    expect(container.querySelectorAll('svg').length).toBe(2);
    // Assert that first method's name and description are shown
    expect(screen.getByText('Generate')).toBeInTheDocument();
    expect(
      screen.getByText('Generate random images or from a certain seed.'),
    ).toBeInTheDocument();
    // Assert that second method's name and description are shown
    expect(screen.getByText('StyleMix')).toBeInTheDocument();
    expect(screen.getByText('Style mix different images.')).toBeInTheDocument();

    // Assert that no form buttons are on the screen
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('shows that form opens when clicked on a method (StyleMix)', () => {
    const { container } = render(
      <Methods
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        data={exampleData}
        url_prefix="urlPrefix"
      />,
    );

    fireEvent.click(screen.getByText('StyleMix'));

    // Assert that form submit button is rendered
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
    // Assert that slider of form is rendered
    expect(screen.getByRole('slider')).toBeInTheDocument();

    // Assert that text input of other method is NOT rendered
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('shows that form opens when clicked on a method (Generate)', () => {
    const { container } = render(
      <Methods
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        data={exampleData}
        url_prefix="urlPrefix"
      />,
    );

    fireEvent.click(screen.getByText('Generate'));

    // Assert that form submit button is rendered
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
    // Assert that slider of form is rendered
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // Assert that text input of other method is NOT rendered
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  test('shows that form closes', async () => {
    render(
      <Methods
        getAccessTokenSilently={getAccessTokenSilentlyStub}
        data={exampleData}
        url_prefix="urlPrefix"
      />,
    );

    fireEvent.click(screen.getByText('Generate'));

    // Assert that form submit button is rendered
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();

    // Close the menu
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));

    // Wait until animation finishes and elements are removed (fails if not removed)
    await waitFor(() => {
      expect(screen.queryByText('Seed')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Generate' }),
      ).not.toBeInTheDocument();
    });
  });
});
