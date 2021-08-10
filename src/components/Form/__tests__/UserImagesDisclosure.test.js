import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserImagesDisclosure } from '../UserImagesDisclosure';

describe('UserImagesDisclosure', () => {
  test('shows text when no image is selected', () => {
    // Stub onChange function
    const onChange = () => {};

    render(<UserImagesDisclosure currentImage="" onChange={onChange} radioForm />);
    expect(screen.getByText('Choose from personal collection')).toBeInTheDocument();
  });

  test('shows image when image is selected', () => {
    const onChange = () => {}; // Stub onChange function

    const envUrl = 'http://somelocalhost';
    const imageId = 'imageid';
    process.env.GATSBY_IMAGE_BUCKET = envUrl;

    render(<UserImagesDisclosure currentImage={imageId} onChange={onChange} radioForm />);
    // assert that chosen image has a src that combines the env variable with the current image id
    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(`${envUrl + imageId}/`);
  });

  test('shows disclosure opens and closes with button presses', async () => {
    const value = false;

    const UserImages = require('../../UserImages/UserImages');
    UserImages.UserImages = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);

    const onChange = () => {}; // Stub onChange function

    render(<UserImagesDisclosure currentImage={value} onChange={onChange} radioForm />);
    expect(screen.getByText('Choose from personal collection')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));

    // Assert that the UserImages component is displayed (here with a mock value)
    expect(screen.getByText('This is a mock!')).toBeInTheDocument();

    // click on the close button
    fireEvent.click(screen.getByText('Close'));

    // assert that no image is shown
    expect(screen.getByText('Choose from personal collection')).toBeInTheDocument();
  });

  test('shows disclosure opens and closes with button presses when image is chosen', async () => {
    const envUrl = 'http://somelocalhost';
    const imageId = 'imageid';
    process.env.GATSBY_IMAGE_BUCKET = envUrl;

    // Mock used component
    const UserImages = require('../../UserImages/UserImages');
    UserImages.UserImages = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);

    const onChange = () => {}; // Stub onChange function

    render(<UserImagesDisclosure currentImage={imageId} onChange={onChange} radioForm />);

    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(`${envUrl + imageId}/`);

    fireEvent.click(screen.getByRole('button'));

    // Assert that the UserImages component is displayed (here with a mock value)
    expect(screen.getByText('This is a mock!')).toBeInTheDocument();

    // click on the close button
    fireEvent.click(screen.getByText('Close'));

    // assert that image is shown
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(`${envUrl + imageId}/`);
  });
});
