import { Navigate } from 'react-router-dom';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';
import { routes } from 'utils/constants/routes';

interface IProps {
  component: React.ReactElement;
}

export const PublicRoute = ({ component }: IProps) => {
  const isLoggedIn = useAppSelector(getTokenSelector);

  return !isLoggedIn ? component : <Navigate to={routes.profile} />;
};
