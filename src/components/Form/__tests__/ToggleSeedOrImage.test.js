import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToggleTextOrImage } from '../ToggleSeedOrImage';

describe('ToggleTextOrImage', () => {
  const exampleDataToggleTextOrImage = {
    name: 'Row_Image',
    default: '',
  };

  const MockFormToggleTextOrImage = () => {
    const { control } = useForm();
    const reset = (stub1, stub2) => {};
    return (
      <ToggleTextOrImage
        data={exampleDataToggleTextOrImage}
        control={control}
        reset={reset}
      />
    );
  };

  beforeEach(() => {
    render(<MockFormToggleTextOrImage />);
  });

  test('shows label of component from data', () => {
    expect(screen.getByText('Row Image')).toBeInTheDocument();
  });

  test('shows click behavior of toggle', () => {
    // Assert that default is the button for personal images
    expect(
      screen.getByText('Choose from personal collection'),
    ).toBeInTheDocument();

    // Open the tab for Seed Input
    fireEvent.click(screen.getByText('Seed'));

    // Assert that a text field is open
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // And the button for personal images is hidden
    expect(
      screen.queryByText('Choose from personal collection'),
    ).not.toBeInTheDocument();

    // Open the tab for Images again
    fireEvent.click(screen.getByText('Image'));

    // Assert that a text field is closed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    // And the button for personal images is hidden
    expect(
      screen.getByText('Choose from personal collection'),
    ).toBeInTheDocument();
  });
});
