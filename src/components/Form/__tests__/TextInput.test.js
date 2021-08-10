import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import React from 'react';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  const exampleDataText = {
    type: 'text',
    name: 'NameSlider',
    default: 'defaultValue',
  };

  const MockFormTextInput = () => {
    const { control } = useForm();
    return <TextInput data={exampleDataText} control={control} />;
  };

  render(<MockFormTextInput />);
  test('shows text label', () => {
    expect(screen.getByText(exampleDataText.name)).toBeInTheDocument();
  });

  test('shows that data is in textfield', () => {
    render(<MockFormTextInput />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox').getAttribute('value')).toBe(exampleDataText.default);
  });
});
