import Sidebar from 'components/Sidebar';

import { Wrapper } from 'pages/Login/styles';
import LoginComponent from 'components/LoginComponent/index';



export default function Login() {
  return (
    <Wrapper>
      <LoginComponent  />
      <Sidebar />
    </Wrapper>
  );
}
