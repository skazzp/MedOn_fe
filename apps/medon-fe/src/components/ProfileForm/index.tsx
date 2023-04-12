import { Input, Form, DatePicker, Select } from 'antd';
import { Container, Label, ProfileImage, StyledButton } from './styles';

export default function ProfileForm() {
  const FORM_WIDTH = 600;

  return (
    <Container>
      <ProfileImage src="https://via.placeholder.com/250" alt="Profile Image" />
      <Form
        name="basic"
        wrapperCol={{ span: 32 }}
        style={{
          maxWidth: FORM_WIDTH,
        }}
        autoComplete="off"
      >
        <Form.Item name="firstName">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            placeholder="First name"
            type="text"
            id="firstName"
            size="large"
          />
        </Form.Item>

        <Form.Item name="lastName">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            placeholder="Last name"
            size="large"
            type="text"
            id="lastName"
          />
        </Form.Item>

        <Form.Item name="email">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Type your email"
            size="large"
            type="email"
            id="email"
            name="email"
          />
        </Form.Item>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Form.Item name="dateOfBirth">
          <DatePicker
            style={{
              width: FORM_WIDTH,
            }}
            size="large"
            id="dateOfBirth"
          />
        </Form.Item>
        <Form.Item name="country">
          <Label htmlFor="country">Country</Label>
          <Input
            size="large"
            type="text"
            id="country"
            placeholder="Type your country"
          />
        </Form.Item>
        <Form.Item name="city">
          <Label htmlFor="city">City</Label>
          <Input
            size="large"
            type="text"
            id="city"
            placeholder="Type your city"
          />
        </Form.Item>
        <Form.Item name="role">
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue={'Select your role'}
            style={{
              width: FORM_WIDTH,
            }}
            size="large"
            options={[
              { value: 'Local Doctor', label: 'Local Doctor' },
              { value: 'Remote Doctor', label: 'Remote Doctor' },
            ]}
          />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton size="large" htmlType="submit" disabled={false}>
            Update Profile
          </StyledButton>
        </Form.Item>
      </Form>
      <StyledButton size="large" htmlType="submit" disabled={false}>
        Change Password
      </StyledButton>
    </Container>
  );
}
