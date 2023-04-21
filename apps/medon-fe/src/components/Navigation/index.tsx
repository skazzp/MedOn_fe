import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';

import { getUserSelector } from 'redux/features/userSlice/userSelectors';
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
  SpecName,
  BlockName,
} from 'components/Navigation/styles';
import profileImagePlaceholder from 'assets/images/Avatar.svg';
import Logo from 'components/Logo';
import { navigation } from 'utils/constants/navigation';
import { persistedStore } from 'redux/store';

export default function Navigation() {
  const { t } = useTranslation();

  const user = useAppSelector(getUserSelector);

  const handleLogout = () => {
    persistedStore.purge();
  };

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
          <NavLinkStyled to={navigation.exit} onClick={() => handleLogout()}>
            <Logout />
            <li>{t('navigation.logout')}</li>
          </NavLinkStyled>
        </Ul>
        <UserBlock>
          <UserAvatar
            src={user.photo || profileImagePlaceholder}
            alt={t<string>('navigation.img-alt')}
          />
          <BlockName>
            {' '}
            <UserName>{`Dr.${user?.lastName}`}</UserName>
            <SpecName>{user?.speciality}</SpecName>
          </BlockName>
        </UserBlock>
      </HeaderBlock>
    </NavContainer>
  );
}
