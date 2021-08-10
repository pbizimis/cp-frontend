import { sortImages } from '../sort-images';

describe('Sort Images', () => {
  test('that sortImages function sorts the raw image data by stylegan version and model version', () => {
    const sortImagesData = {
      image_url_prefix: 'https://images.webdesigan.com/',
      image_ids: [
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
        {
          url: 'eacd935a2a7640d5accf8257f3aa00ed',
          auth0_id: 'google-oauth2|114778200891334419591',
          creation_date: '2021-07-29T14:41:57.666000',
          method: {
            name: 'StyleMix',
            model: {
              img: 20,
              res: 20,
              fid: 20,
              version: 'StyleGan2ADA',
            },
            row_image: '123',
            column_image: '123',
            styles: 'Middle',
            truncation: 1,
          },
        },
        {
          url: 'ea7971e5decc45269ef98a17884f3137',
          auth0_id: 'google-oauth2|114778200891334419591',
          creation_date: '2021-07-29T12:55:11.594000',
          method: {
            name: 'Generation',
            model: {
              img: 10,
              res: 10,
              fid: 10,
              version: 'StyleGan1',
            },
            truncation: 1,
            seed: '',
          },
        },
      ],
    };
    const assertionSortImagesData = {
      StyleGan2ADA: {
        'Images 10k, Resolution 10px, FID 10': [
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
        ],
        'Images 20k, Resolution 20px, FID 20': [
          {
            url: 'eacd935a2a7640d5accf8257f3aa00ed',
            auth0_id: 'google-oauth2|114778200891334419591',
            creation_date: '2021-07-29T14:41:57.666000',
            method: {
              name: 'StyleMix',
              model: {
                img: 20,
                res: 20,
                fid: 20,
                version: 'StyleGan2ADA',
              },
              row_image: '123',
              column_image: '123',
              styles: 'Middle',
              truncation: 1,
            },
          },
        ],
      },
      StyleGan1: {
        'Images 10k, Resolution 10px, FID 10': [
          {
            url: 'ea7971e5decc45269ef98a17884f3137',
            auth0_id: 'google-oauth2|114778200891334419591',
            creation_date: '2021-07-29T12:55:11.594000',
            method: {
              name: 'Generation',
              model: {
                img: 10,
                res: 10,
                fid: 10,
                version: 'StyleGan1',
              },
              truncation: 1,
              seed: '',
            },
          },
        ],
      },
    };

    const result = sortImages(sortImagesData);
    expect(result).toStrictEqual(assertionSortImagesData);
  });
});
