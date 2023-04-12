import { Input, Button, Form, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import type { DatePickerProps } from 'antd';
import { Container, Label, ProfileImage, CustomSelect } from './styles';

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
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'First name is required!' }]}
        >
          <Label htmlFor="firstName">First Name</Label>
          <Input
            placeholder="First name"
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
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
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
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
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
            size="large"
            type="email"
            id="email"
            name="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Label htmlFor="password">Password</Label>
          <Input.Password
            className="input-password"
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
            type="password"
            id="password"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Label htmlFor="password">Repeat Password</Label>
          <Input.Password
            className="input-password"
            placeholder="Repeat Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
            type="password"
            id="password"
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
              backgroundColor: theme.colors.BACKGROUND_PRIMARY,
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
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
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
            style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
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
          <CustomSelect
            defaultValue={'Select your role'}
            onChange={handleChangeRole}
            style={{
              width: FORM_WIDTH,
            }}
            dropdownStyle={{
              backgroundColor: theme.colors.BACKGROUND_PRIMARY,
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
              padding: '5px',
              width: BUTTON_WIDTH,
            }}
            size="large"
            type="primary"
            htmlType="submit"
            disabled={false}
          >
            UPDATE PROFILE
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
