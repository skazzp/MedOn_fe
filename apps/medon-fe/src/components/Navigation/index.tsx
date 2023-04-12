import { useTranslation } from 'react-i18next';
import { Container, HeaderBlock, Ul, Dashboard, Briefcase, Links, Profile, Patient, Help, Logout, UserBlock, UserAvatar, UserName} from 'components/Navigation/styles';
import profileImagePlaceholder from 'assets/images/Avatar.svg';
import Logo from 'components/Logo';


export default function Navigation() {
  const { t } = useTranslation();

  return (
    <Container>
      <HeaderBlock>
        <Logo />
              <Ul>
                  <Links to="/dashboard">
                      <li>
                      <Dashboard />
                          {t("navigation.dashboard")}
                      </li>
                  </Links>
            <Links to="/appointments">
                      <li>
                          <Briefcase />
                          {t("navigation.appointments")}
                      </li>
                  </Links>
          <Links to="/profile">
                      <li>
                          <Profile />
                           {t("navigation.profile")}
                      </li>
                  </Links>
                  <Links to="/patient-list">
                      <li>
                          <Patient />
                          {t("navigation.patient")}
                      </li>
                  </Links>
                  <Links to="/help">
                      <li>
                          <Help />
                        {t("navigation.help")}
                      </li>
                  </Links>
                  <Links to="/logout">
                      <li>
                          <Logout />
                           {t("navigation.logout")}
                      </li>
                  </Links>
              </Ul>
          <UserBlock>
            <UserAvatar
              src={ profileImagePlaceholder}
              alt="User avatar"
            />
            <UserName>{'Anonymous'}</UserName>
          </UserBlock>
          </HeaderBlock>
    </Container>
  );
}

