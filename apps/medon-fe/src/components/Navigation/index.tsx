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
  LogoWrapper,
} from 'components/Navigation/styles';
import profileImagePlaceholder from 'assets/images/Avatar.svg';
import Logo from 'components/Logo';
import useSpecOptions from 'components/RegistrationForm/hooks';
import LogOut from 'components/LogOut';
import { roles } from 'utils/constants';
import { routes } from 'utils/constants/routes';

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
      disabled: !user.role,
    },
    {
      to: routes.appointments,
      icon: <Briefcase />,
      label: 'navigation.appointments',
      disabled: !user.role,
    },
    { to: routes.profile, icon: <Profile />, label: 'navigation.profile' },
    {
      to: routes.patients,
      icon: <Patient />,
      label: 'navigation.patient',
      disabled: !user.role,
    },
    ...(user.role === roles.remote
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
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Ul>
          {navItems.map(({ to, icon, label, disabled }) => (
            <NavLinkStyled to={to} key={to} disabled={disabled}>
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
            src={
              user.photo
                ? process.env.NX_PUBLIC_S3_BUCKET_URL + user.photo
                : profileImagePlaceholder
            }
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
