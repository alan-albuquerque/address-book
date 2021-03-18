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

export interface IRandomUserStreet {
  name: string;
  number: number;
}

export interface IRandomUserLocation {
  street: IRandomUserStreet;
  city: string;
  state: string;
  postcode: string;
}

export interface IRandomUser {
  name: IRandomUserName;
  email: string;
  phone: string;
  cell: string;
  login: IRandomUserLogin;
  picture: IRandomUserPicture;
  location: IRandomUserLocation;
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

export interface IRandomUserFilterParams {
  nat?: string;
}

export interface IRandomUserPaginateParams extends IRandomUserFilterParams {
  page: number;
  results: number;
}

export interface IRandomUserService {
  getUsersPaginated(
    params: IRandomUserPaginateParams,
  ): Promise<IRandomUserResponse<IRandomUser>>;
}
