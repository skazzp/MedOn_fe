import { useTranslation } from 'react-i18next';
import {
  NavContainer,
  HeaderBlock,
  Ul,
  NavLinkStyled,
  UserBlock,
  UserAvatar,
  UserName,
  navItems,
} from 'components/Navigation/styles';
import Logo from 'components/Logo';
import { logout } from 'redux/features/userSlice/userSlice';
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
  
  const user = useAppSelector(getUserSelector);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setUser(initialState.user));
    dispatch(setToken(''));
  };

  return (
    <NavContainer>
      <HeaderBlock>
        <Logo />
        <Ul>
          {navItems.map(({ to, icon, label, onClick }) => (
            <NavLinkStyled to={(to)} key={to} onClick={logout}>
              <li>
                {icon}
                <div>{t(label)}</div>
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