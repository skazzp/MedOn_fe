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
import { navigation } from 'utils/constants/navigation';

export default function Navigation() {
  const { t } = useTranslation();

  const navItems = [
    {
      to: navigation.dashboard,
      icon: <Dashboard />,
      label: 'navigation.dashboard',
    },
    {
      to: navigation.appointments,
      icon: <Briefcase />,
      label: 'navigation.appointments',
    },
    { to: navigation.profile, icon: <Profile />, label: 'navigation.profile' },
    {
      to: navigation.patientList,
      icon: <Patient />,
      label: 'navigation.patient',
    },
    { to: navigation.help, icon: <Help />, label: 'navigation.help' },
    {
      to: navigation.exit,
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
