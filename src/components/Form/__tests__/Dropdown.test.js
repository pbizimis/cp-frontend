import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  const exampleDataDropdown1 = {
    type: 'dropdown',
    name: 'Model',
    place: 1,
    options: [
      {
        img: 1,
        res: 1,
        fid: 1,
        version: 'stylegan2_ada',
      },
      {
        img: 2,
        res: 2,
        fid: 2,
        version: 'stylegan2_ada',
      },
    ],
    default: 0,
  };
  const MockFormDropdown = () => {
    const { control } = useForm();
    return <Dropdown data={exampleDataDropdown1} control={control} />;
  };
  beforeEach(() => {
    render(<MockFormDropdown />);
  });
  test('shows only the default option in the dropdown and the name of the dropdown', () => {
    expect(screen.getByText(exampleDataDropdown1.name)).toBeInTheDocument();
    expect(screen.getByText('Model (1k images, Resolution 1, FID 1)')).toBeInTheDocument();
    expect(screen.queryByText('Model (2k images, Resolution 2, FID 2)')).not.toBeInTheDocument();
  });
  test('shows all options and the dropdown name when clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Model (1k images, Resolution 1, FID 1)' }));

    expect(screen.getByText(exampleDataDropdown1.name)).toBeInTheDocument();
    expect(screen.getAllByText('Model (1k images, Resolution 1, FID 1)').length === 2);
    expect(screen.getByText('Model (2k images, Resolution 2, FID 2)')).toBeInTheDocument();
  });
});
