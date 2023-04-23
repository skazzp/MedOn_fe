import { RootState } from 'redux/store';

export function prepareHeaders(
  headers: Headers,
  { getState }: { getState: () => unknown }
) {
  const { token } = (getState() as RootState).userState;

  if (token) headers.set('authorization', `Bearer ${token}`);
}
