import axios from 'axios';
import { randomUserService } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function getContacts() {
  return {
    data: [
      {
        results: [
          {
            name: {
              first: 'brad',
              last: 'gibson',
            },
          },
        ],
        info: {
          results: 1,
          page: 1,
        },
      },
    ],
  };
}

describe('randomUserService', () => {
  describe('getUsersPaginated', () => {
    test('should proper call api and return the data', async () => {
      const mockResp = getContacts();
      mockedAxios.get.mockResolvedValue(mockResp);

      const response = await randomUserService.getUsersPaginated({
        page: 1,
        results: 50,
        nat: ['a', 'b'].join(','),
      });
      expect(response).toEqual(mockResp.data);
    });
  });
});
