import { RootState } from 'redux/store';

export const getUserSelector = (state: RootState) => state.userState.user;
export const getTokenSelector = (state: RootState) => state.userState.token;
export const getIsVerifiedSelector = (state: RootState) =>
  state.userState.isVerified;
