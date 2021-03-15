import axios from 'axios';
import {
  IRandomUser,
  IRandomUserPaginateParams,
  IRandomUserResponse,
  IRandomUserService,
} from './types';

export * from './types';

class RandomUserService implements IRandomUserService {
  private readonly apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || <string>process.env.API_RANDOM_USER_URL;
  }

  async getUsersPaginated(
    params: IRandomUserPaginateParams,
  ): Promise<IRandomUserResponse<IRandomUser>> {
    const response = await axios.get<IRandomUserResponse<IRandomUser>>(
      this.apiUrl,
      {
        params,
      },
    );
    return response.data;
  }
}

export const randomUserService: IRandomUserService = new RandomUserService();
