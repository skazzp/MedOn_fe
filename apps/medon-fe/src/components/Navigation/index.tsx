import { useTranslation } from 'react-i18next';
import {
  NavContainer,
  HeaderBlock,
  Ul,
  Dashboard,
  Briefcase,
  NavLinkStyled,
  Profile,
  Patient,
  Help,
  Logout,
  UserBlock,
  UserAvatar,
  UserName,
} from 'components/Navigation/styles';
import profileImagePlaceholder from 'assets/images/Avatar.svg';
import Logo from 'components/Logo';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import {
  initialState,
  setToken,
  setUser,
} from 'redux/features/userSlice/userSlice';

export default function Navigation() {
  const { t } = useTranslation();
  // const storedUser = localStorage.getItem('user');
  // const user = storedUser ? JSON.parse(storedUser) : null;
  const user = useAppSelector(getUserSelector);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setUser(initialState.user));
    dispatch(setToken(''));
  };
  const navItems = [
    { to: '/dashboard', icon: <Dashboard />, label: t('navigation.dashboard') },
    {
      to: '/appointments',
      icon: <Briefcase />,
      label: t('navigation.appointments'),
    },
    { to: '/profile', icon: <Profile />, label: t('navigation.profile') },
    { to: '/patient-list', icon: <Patient />, label: t('navigation.patient') },
    { to: '/help', icon: <Help />, label: t('navigation.help') },
    {
      to: '/logout',
      icon: <Logout />,
      label: t('navigation.logout'),
      onClick: logout,
    },
  ];

  return (
    <NavContainer>
      <HeaderBlock>
        <Logo />
        <Ul>
          {navItems.map(({ to, icon, label, onClick }) => (
            <NavLinkStyled to={to} key={to} onClick={onClick}>
              <li>
                {icon}
                <div>{label}</div>
              </li>
            </NavLinkStyled>
          ))}
        </Ul>
        <UserBlock>
          <UserAvatar
            src={user.photo || profileImagePlaceholder}
            alt="User avatar"
          />
          <UserName>{`Dr.${user?.lastName}`}</UserName>
        </UserBlock>
      </HeaderBlock>
    </NavContainer>
  );
}
