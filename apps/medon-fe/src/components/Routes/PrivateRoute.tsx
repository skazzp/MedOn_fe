import Navigation from 'components/Navigation';
import { Navigate } from 'react-router-dom';
import Container from './styles';
// import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
// import { useAppSelector } from 'redux/hooks';

interface IProps {
  component: React.ReactElement;
}

export const PrivateRoute = ({ component }: IProps) => {
  const isLoggedIn = true;
  // const isLoggedIn = useAppSelector(getTokenSelector);
  return isLoggedIn ? (
    <Container>
      <Navigation />
      {component}
    </Container>
  ) : (
    <Navigate to="/login" />
  );
};
