import { Link } from 'react-router-dom';
import { routes } from 'utils/constants';
import logo from 'assets/images/logo.svg';
import { t } from 'i18next';

const Logo = () => (
  <Link to={routes.dashboard} style={{ width: 'fit-content' }}>
    <img src={logo} alt={`${t('logoAlt')}`} />
  </Link>
);

export default Logo;
