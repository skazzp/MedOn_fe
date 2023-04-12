import { Input, Button, Form, Select, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { Container, Label, ProfileImage } from './styles';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleChangeSelect = (value: string) => {
  console.log(`selected ${value}`);
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export default function ProfileForm() {
  return (
    <Container>
      <ProfileImage src="https://via.placeholder.com/250" alt="Profile Image" />
      <Form
        name="basic"
        wrapperCol={{ span: 32 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" id="firstName" name="firstName" />
        </Form.Item>

        <Form.Item>
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" id="lastName" name="lastName" />
        </Form.Item>

        <Form.Item>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" />
        </Form.Item>

        <Form.Item>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </Form.Item>

        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Form.Item>
          <DatePicker
            style={{ width: 600 }}
            onChange={onChange}
            id="dateOfBirth"
            name="dateOfBirth"
          />
        </Form.Item>
        <Form.Item>
          <Label htmlFor="country">Country</Label>
          <Input type="text" id="country" name="country" />
        </Form.Item>
        <Form.Item>
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" />
        </Form.Item>
        <Form.Item>
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue="Select a Role"
            style={{ width: 600 }}
            onChange={handleChangeSelect}
            options={[
              { value: 'Local Doctor', label: 'Local Doctor' },
              { value: 'Remote Doctor', label: 'Remote Doctor' },
            ]}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          UPDATE PROFILE
        </Button>
      </Form>
    </Container>
  );
}
