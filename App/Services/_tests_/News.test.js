import {
  getNewsAPI,
  getAgencyAPI,
  getSearchNewsAPI,
} from '../News';

jest.mock('../Api', () => () => ({
  get: async () => ({ responseCode: 'error' }),
}));

describe('News API', () => {
  it('Get news', async () => {
    const payload = {
      country: 'us',
      page: 1,
      pageSize: 10,
    };
    const response = { responseCode: 'error' };
    await expect(getNewsAPI(payload)).resolves.toEqual(response);
  });

  it('Get agency', async () => {
    const payload = {
      country: 'us',
    };
    const response = { responseCode: 'error' };
    await expect(getAgencyAPI(payload)).resolves.toEqual(response);
  });

  it('Get search news', async () => {
    const payload = {
      country: 'us',
      page: 1,
      pageSize: 10,
      q: '1',
    };
    const response = { responseCode: 'error' };
    await expect(getSearchNewsAPI(payload)).resolves.toEqual(response);
  });
});
