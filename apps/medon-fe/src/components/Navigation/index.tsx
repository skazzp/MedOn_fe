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
  UserBlock,
  UserAvatar,
  UserName,
  SpecName,
  BlockName,
  Availability,
} from 'components/Navigation/styles';
import profileImagePlaceholder from 'assets/images/Avatar.svg';
import Logo from 'components/Logo';
import { routes } from 'utils/constants/routes';
import useSpecOptions from 'components/RegistrationForm/useSpecOptions';
import LogOut from 'components/LogOut';

export default function Navigation() {
  const { t } = useTranslation();
  const user = useAppSelector(getUserSelector);
  const { specialityOptions } = useSpecOptions();
  const userSpeciality =
    specialityOptions.find((spec) => spec.value === user?.specialityId)
      ?.label ?? '';

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
    ...(user.role === 'remote'
      ? [
          {
            to: routes.availability,
            icon: <Availability />,
            label: 'navigation.availability',
          },
        ]
      : []),
    { to: routes.help, icon: <Help />, label: 'navigation.help' },
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
          <li>
            <LogOut />
          </li>
        </Ul>
        <UserBlock>
          <UserAvatar
            src={user.photo || profileImagePlaceholder}
            alt={t<string>('navigation.img-alt')}
          />
          <BlockName>
            <UserName>{`Dr.${user?.lastName}`}</UserName>
            <SpecName>{userSpeciality}</SpecName>
          </BlockName>
        </UserBlock>
      </HeaderBlock>
    </NavContainer>
  );
}
