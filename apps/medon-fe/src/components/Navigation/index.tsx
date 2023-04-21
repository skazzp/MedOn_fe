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
import { routes } from 'utils/constants/routes';

export default function Navigation() {
  const { t } = useTranslation();

  const navItems = [
    {
      to: routes.dashboard,
      icon: <Dashboard />,
      label: 'navigation.dashboard',
    },
    {
      to: routes.appointments,
      icon: <Briefcase />,
      label: 'navigation.appointments',
    },
    { to: routes.profile, icon: <Profile />, label: 'navigation.profile' },
    {
      to: routes.patients,
      icon: <Patient />,
      label: 'navigation.patient',
    },
    { to: routes.help, icon: <Help />, label: 'navigation.help' },
    {
      to: routes.exit,
      icon: <Logout />,
      label: 'navigation.logout',
    },
  ];

  return (
    <NavContainer>
      <HeaderBlock>
        <Logo />
        <Ul>
          {navItems.map(({ to, icon, label }) => (
            <NavLinkStyled to={to} key={to}>
              <li>
                {icon}
                <div>{t(label)}</div>
              </li>
            </NavLinkStyled>
          ))}
        </Ul>
        <UserBlock>
          <UserAvatar
            src={profileImagePlaceholder}
            alt={t<string>('navigation.img-alt')}
          />
          <UserName>Dr.Anonymous</UserName>
        </UserBlock>
      </HeaderBlock>
    </NavContainer>
  );
}
