import { Input, Button, Form, DatePicker, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import { Container, Label, ProfileImage } from './styles';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleChangeRole = (value: any) => {
  console.log(`selected ${value}`);
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export default function ProfileForm() {
  const FORM_WIDTH = 600;
  const BUTTON_WIDTH = 200;
  return (
    <Container>
      <ProfileImage src="https://via.placeholder.com/250" alt="Profile Image" />
      <Form
        name="basic"
        wrapperCol={{ span: 32 }}
        style={{
          maxWidth: FORM_WIDTH,
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'First name is required!' }]}
        >
          <Label htmlFor="firstName">First Name</Label>
          <Input
            placeholder="First name"
            type="text"
            id="firstName"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Last name is required!' }]}
        >
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            placeholder="Last name"
            size="large"
            type="text"
            id="lastName"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Your email is required!' }]}
        >
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
        <Form.Item
          name="dateOfBirth"
          rules={[{ required: true, message: 'Birth date is required!' }]}
        >
          <DatePicker
            style={{
              width: FORM_WIDTH,
            }}
            onChange={onChange}
            size="large"
            id="dateOfBirth"
          />
        </Form.Item>
        <Form.Item
          name="country"
          rules={[{ required: true, message: 'Country is required!' }]}
        >
          <Label htmlFor="country">Country</Label>
          <Input
            size="large"
            type="text"
            id="country"
            placeholder="Type your country"
          />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[{ required: true, message: 'City is required!' }]}
        >
          <Label htmlFor="city">City</Label>
          <Input
            size="large"
            type="text"
            id="city"
            placeholder="Type your city"
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'A role is mandatory!' }]}
        >
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue={'Select your role'}
            onChange={handleChangeRole}
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
          <Button
            style={{
              padding: '8px',
              fontSize: '14px',
              width: BUTTON_WIDTH,
              fontWeight: 'bold',
            }}
            size="large"
            type="primary"
            htmlType="submit"
            disabled={true}
          >
            UPDATE PROFILE
          </Button>
        </Form.Item>
      </Form>
      <Button
        style={{
          padding: '8px',
          width: BUTTON_WIDTH,
          fontSize: '14px',
          fontWeight: 'bold',
        }}
        size="large"
        type="primary"
        htmlType="submit"
        disabled={false}
      >
        UPDATE PASSWORD
      </Button>
    </Container>
  );
}
