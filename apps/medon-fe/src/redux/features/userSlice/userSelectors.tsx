import { RootState } from 'redux/store';

export const getUserSelector = (state: RootState) => state.userState.user;
