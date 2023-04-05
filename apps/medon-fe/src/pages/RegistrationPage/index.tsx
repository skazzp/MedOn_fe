import RegistrationForm from 'components/RegistrationForm';
import { FormContainer } from './styles';
import logo from '../../assets/images/logo.svg';

export default function RegistrationPage() {
  return (
    <FormContainer>
      <div>
        <img src={logo} alt="MedOn Logo" />
      </div>
      <h1>Registration</h1>
      <p>Please, create your medical account and become a member</p>
      <RegistrationForm />
    </FormContainer>
  );
}
