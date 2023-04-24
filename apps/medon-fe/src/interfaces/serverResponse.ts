import { HttpStatus } from 'utils/constants/httpStatus';

export interface IServerResponse<T = undefined> {
  statusCode: HttpStatus;
  message?: string | string[];
  data?: T;
}

export interface IServerError {
  status: HttpStatus;
  data: IServerResponse;
}
