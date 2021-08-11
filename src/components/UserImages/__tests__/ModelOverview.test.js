import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RadioGroup } from '@headlessui/react';
import { ModelOverview } from '../ModelOverview';

describe('ModelOverview', () => {
  const mockModelData = [
    {
      url: 'c31ad1323ed648feb93cd7398fcf1894',
      auth0_id: 'google-oauth2|114778200891334419591',
      creation_date: '2021-07-29T14:41:57.666000',
      method: {
        name: 'StyleMix',
        model: {
          img: 10,
          res: 10,
          fid: 10,
          version: 'StyleGan2ADA',
        },
        row_image: '123',
        column_image: '123',
        styles: 'Middle',
        truncation: 1,
      },
    },
    {
      url: '3bf5df238b3741559d9e3806c97f2d33',
      auth0_id: 'google-oauth2|114778200891334419591',
      creation_date: '2021-07-29T14:41:57.666000',
      method: {
        name: 'StyleMix',
        model: {
          img: 10,
          res: 10,
          fid: 10,
          version: 'StyleGan2ADA',
        },
        row_image: '123',
        column_image: '123',
        styles: 'Middle',
        truncation: 1,
      },
    },
  ];

  beforeAll(() => {
    const UserImages = require('../UserImages');
    UserImages.ImageContainer = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);
  });

  // radio false
  test('that version name is displayed', () => {
    render(<ModelOverview modelName="Model Version 1" modelData={mockModelData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);
    expect(screen.getByText('Model: Model Version 1')).toBeInTheDocument();
  });

  test('that no images are displayed in default state', () => {
    render(<ModelOverview modelName="Model Version 1" modelData={mockModelData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);

    expect(screen.queryAllByRole('img').length).toBe(0);
  });

  test('that two images are displayed in default state (because of two images in data)', () => {
    render(<ModelOverview modelName="Model Version 1" modelData={mockModelData} urlPrefix="urlPrefix" register={() => {}} radioForm={false} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('img').length).toBe(2);

    // next click hide images again
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.queryAllByRole('img').length).toBe(0);
  });

  test('that images have the correct src value', () => {
    render(<ModelOverview modelName="Model Version 1" modelData={mockModelData} urlPrefix="http://testlocalhost/" register={() => {}} radioForm={false} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('img')[0].src).toBe('http://testlocalhost/c31ad1323ed648feb93cd7398fcf1894');
    expect(screen.getAllByRole('img')[1].src).toBe('http://testlocalhost/3bf5df238b3741559d9e3806c97f2d33');
  });

  // radio true (makes images act as radio buttons that can be selected)

  test('that images are clickable and change the onClick function', () => {
    let onChangeValue;
    // Mock the RadioGroup to get access on the onChange
    render(
      <RadioGroup
        onChange={(e) => onChangeValue = e}
      >
        <ModelOverview
          modelName="Model Version 1"
          modelData={mockModelData}
          urlPrefix="urlPrefix"
          register={() => {}}
          radioForm
          checkboxForm={false}
          deleteLoading={false}
        />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole('button'));

    // Click on one image
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(onChangeValue).toBe('c31ad1323ed648feb93cd7398fcf1894');

    // Click on the other
    fireEvent.click(screen.getAllByRole('img')[1]);
    expect(onChangeValue).toBe('3bf5df238b3741559d9e3806c97f2d33');
  });
});
