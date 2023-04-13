export interface IResetPassword {
  token?: string;
  newPassword: string;
}

export interface IForgetPassword {
  email: string;
}
