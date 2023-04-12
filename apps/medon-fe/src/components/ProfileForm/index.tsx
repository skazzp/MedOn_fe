import {
  Container,
  Form,
  Input,
  Label,
  Select,
  SubmitButton,
  Option,
  ProfileImage,
} from './styles';

export default function ProfileForm() {
  return (
    <Container>
      <ProfileImage src="https://via.placeholder.com/250" alt="Profile Image" />
      <Form>
        <Label htmlFor="firstName">First Name</Label>
        <Input type="text" id="firstName" name="firstName" />

        <Label htmlFor="lastName">Last Name</Label>
        <Input type="text" id="lastName" name="lastName" />

        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />

        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />

        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input type="date" id="dateOfBirth" name="dateOfBirth" />

        <Label htmlFor="country">Country</Label>
        <Input type="text" id="country" name="country" />

        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" name="city" />

        <Label htmlFor="role">Role</Label>
        <Select id="role" name="role">
          <Option value="">Select Role</Option>
          <Option value="localDoctor">Local Doctor</Option>
          <Option value="remoteDoctor">Remote Doctor</Option>
        </Select>
      </Form>
      <SubmitButton type="submit">UPDATE PROFILE</SubmitButton>
    </Container>
  );
}
