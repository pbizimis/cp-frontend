import { act } from 'react-dom/test-utils';
import { postApi } from '../use-api';

describe("API", () => {
  
  global.fetch = jest.fn().mockImplementation((url, fetchObject) => Promise.resolve(({
    json: () => ({ 'content-type': fetchObject.headers['Content-Type'], method: fetchObject.method }),
  })));

  test('shows that api is fetched as a GET when no data is passed', async () => {
    let resultApi;
    await act(async () => {
      resultApi = await postApi(null, 'url', () => {});
    });
    expect(resultApi.data.method).toBe('GET');
    expect(resultApi.data['content-type']).toBe(undefined);
  });

  test('shows that api is fetched as a POST when data is passed', async () => {
    let resultApi;
    await act(async () => {
      resultApi = await postApi('data', 'url', () => {});
    });
    expect(resultApi.data.method).toBe('POST');
    expect(resultApi.data['content-type']).toBe('application/json');
  });

  test('shows that api response has an error if an error occurs', async () => {
    global.fetch = jest.fn().mockImplementation((url, fetchObject) => Promise.resolve(({
      json: () => {
        throw {
          name: 'Error',
          message: 'This is an error!',
        };
      },
    })));

    let resultApi;
    await act(async () => {
      resultApi = await postApi('data', 'url', () => {});
    });
    expect(resultApi.error.name).toBe('Error');
    expect(resultApi.error.message).toBe('This is an error!');
  });
});