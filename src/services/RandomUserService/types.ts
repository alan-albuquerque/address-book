export interface IRandomUserName {
  title: string;
  first: string;
  last: string;
}

export interface IRandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IRandomUserLogin {
  username: string;
  uuid: string;
}

export interface IRandomUser {
  name: IRandomUserName;
  email: string;
  login: IRandomUserLogin;
  picture: IRandomUserPicture;
}

export interface IRandomUserResponseInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface IRandomUserResponse<T> {
  results: T[];
  info: IRandomUserResponseInfo;
}

export interface IRandomUserPaginateParams {
  page: number;
  results: number;
}

export interface IRandomUserService {
  getUsersPaginated(
    params: IRandomUserPaginateParams,
  ): Promise<IRandomUserResponse<IRandomUser>>;
}
