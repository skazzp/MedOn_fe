import { Navigate } from 'react-router-dom';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

interface IProps {
  component: React.ReactElement;
}

export const PublicRoute = ({ component }: IProps) => {
  const isLoggedIn = useAppSelector(getTokenSelector);
  // const isLoggedIn = false;
  return !isLoggedIn ? component : <Navigate to="/profile" />;
};
