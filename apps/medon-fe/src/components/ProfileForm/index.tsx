import { Input, Button, Form, Select, DatePicker } from 'antd';
import { useTheme } from 'styled-components';
import type { DatePickerProps } from 'antd';
import { Container, Label, ProfileImage } from './styles';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleChangeRole = (value: string) => {
  console.log(`selected ${value}`);
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export default function ProfileForm() {
  const theme = useTheme();

  const FORM_WIDTH = 600;
  const BUTTON_WIDTH = 300;
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
        <Form.Item>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            type="text"
            id="firstName"
            name="firstName"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            size="large"
            type="text"
            id="lastName"
            name="lastName"
          />
        </Form.Item>

        <Form.Item>
          <Label htmlFor="email">Email</Label>
          <Input
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            size="large"
            type="email"
            id="email"
            name="email"
          />
        </Form.Item>

        <Form.Item>
          <Label htmlFor="password">Password</Label>
          <Input
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            size="large"
            type="password"
            id="password"
            name="password"
          />
        </Form.Item>

        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Form.Item>
          <DatePicker
            style={{
              width: FORM_WIDTH,
              backgroundColor: theme.colors.BACKGROUND_PRIMARY,
            }}
            onChange={onChange}
            size="large"
            id="dateOfBirth"
            name="dateOfBirth"
          />
        </Form.Item>
        <Form.Item>
          <Label htmlFor="country">Country</Label>
          <Input
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            size="large"
            type="text"
            id="country"
            name="country"
          />
        </Form.Item>
        <Form.Item>
          <Label htmlFor="city">City</Label>
          <Input
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            size="large"
            type="text"
            id="city"
            name="city"
          />
        </Form.Item>
        <Form.Item>
          <Label htmlFor="role">Role</Label>
          <Select
            className="select-role"
            style={{
              width: FORM_WIDTH,
            }}
            dropdownStyle={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            onChange={handleChangeRole}
            size="large"
            options={[
              { value: 'Local Doctor', label: 'Local Doctor' },
              { value: 'Remote Doctor', label: 'Remote Doctor' },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ maxWidth: BUTTON_WIDTH }}
            size="large"
            type="primary"
            htmlType="submit"
            block
            disabled={false}
          >
            UPDATE PROFILE
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
