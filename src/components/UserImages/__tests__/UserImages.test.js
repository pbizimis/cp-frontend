import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UserImages } from '../UserImages';

describe('UserImages', () => {
  const mockUserImagesData = {
    error: null,
    data: {
      image_url_prefix: 'https://images.webdesigan.com/',
      image_ids: [
        {
          url: 'c31ad1323ed648feb93cd7398fcf1894',
          auth0_id: 'google-oauth2|114778200891334419591',
          creation_date: '2021-07-29T14:41:57.666000',
          method: {
            name: 'StyleMix',
            model: {
              img: 31,
              res: 256,
              fid: 12,
              version: 'StyleGan2ADA',
            },
            row_image: '123',
            column_image: '123',
            styles: 'Middle',
            truncation: 1,
          },
        },
        {
          url: 'c31ad1323ed648feb93cd7398fcf1894',
          auth0_id: 'google-oauth2|114778200891334419591',
          creation_date: '2021-07-29T14:41:57.666000',
          method: {
            name: 'StyleMix',
            model: {
              img: 31,
              res: 256,
              fid: 12,
              version: 'StyleGan1ADA',
            },
            row_image: '123',
            column_image: '123',
            styles: 'Middle',
            truncation: 1,
          },
        },
      ],
    },
  };

  beforeAll(() => {
    const UserImages = require('../UserImages');
    UserImages.ImageContainer = jest.fn().mockReturnValue(<h1>This is a mock!</h1>);
  });

  test('that the label text is displayed', async () => {
    // Mock fetchData request
    const useApi = require('../../../utils/use-api');
    useApi.useApi = jest.fn().mockImplementation((...args) => mockUserImagesData);

    await act(async () => {
      render(<UserImages register={() => {}} radioForm={false} />);
    });
    expect(screen.getByText('Your Images')).toBeInTheDocument();
  });

  test('that the model labels are displayed in default state and two button svgs are rendered', async () => {
    // Mock fetchData request
    const useApi = require('../../../utils/use-api');
    useApi.useApi = jest.fn().mockImplementation((...args) => mockUserImagesData);

    let containerElement;
    await act(async () => {
      const { container } = render(<UserImages register={() => {}} radioForm={false} />);
      containerElement = container;
    });

    expect(screen.getByText('StyleGan2ADA')).toBeInTheDocument();
    expect(screen.getByText('StyleGan1ADA')).toBeInTheDocument();
    expect(containerElement.querySelectorAll('svg').length).toBe(2);
  });

  test('that the loading circle is rendered when api data is fetched', async () => {
    // Mock fetchData request
    const useApi = require('../../../utils/use-api');
    useApi.useApi = jest.fn().mockImplementation((...args) => ({ error: null, data: null }));

    let containerElement;
    await act(async () => {
      const { container } = render(<UserImages register={() => {}} radioForm={false} />);
      containerElement = container;
    });

    // No text elements
    expect(screen.queryAllByText(/StyleGan/i).length).toBe(0);
    // One loading svg
    expect(containerElement.querySelectorAll('svg').length).toBe(1);
  });
});
