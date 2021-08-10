import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { DiscreteSlider } from '../Slider';

describe('Slider', () => {
  const exampleDataSlider = {
    type: 'dropdown',
    name: 'Truncation',
    place: 1,
    max: 2,
    min: -2,
    step: 0.1,
    default: 1,
  };

  const MockFormSlider = () => {
    const { control } = useForm();
    return <DiscreteSlider data={exampleDataSlider} control={control} />;
  };

  beforeEach(() => {
    render(<MockFormSlider />);
  });

  test('shows slider label', () => {
    expect(screen.getByText(exampleDataSlider.name)).toBeInTheDocument();
  });

  test('shows slider values are based on input', () => {
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('slider').getAttribute('aria-valuemax')).toBe('2');
    expect(screen.getByRole('slider').getAttribute('aria-valuenow')).toBe('1');
    expect(screen.getByRole('slider').getAttribute('aria-valuemin')).toBe('-2');
  });

  test('shows slider steps are rendered correctly', () => {
    let totalSteps = 0;
    screen.queryAllByText('').map((node) => {
      if (node.getAttribute('data-index')) {
        totalSteps++;
      }
    });
    const totalRange = Math.abs(exampleDataSlider.max - exampleDataSlider.min);
    // -2 because the selector circle of the slider has a data-index and the 0th element
    const step = totalRange / (totalSteps - 2);
    expect(step).toBe(exampleDataSlider.step);
  });
});
