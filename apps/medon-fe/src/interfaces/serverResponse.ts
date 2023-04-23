import { HttpStatus } from 'utils/constants/httpStatus';

export interface IServerResponse<T = undefined> {
  statusCode: HttpStatus;
  message?: string;
  data?: T;
}
