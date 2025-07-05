import {Button , Form, Input, notification,  Row, Col} from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
    const onFinish = async (values) => {
    console.log(">> check ", values)
    const res = await registerUserAPI(
      values.fullName, values.email, values.password, values.phone);
    if (res.data) {
      notification.success({
        message: 'Register user',
        description: 'Register user successfully !'
      });
      navigate('/login')
    } else {
      notification.error({
        message: 'Register user error',
        description: JSON.stringify(res.message)
      })
    }
  }
    return (
      <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: "0 auto" }} // căn giữa form
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Please input your Full Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          {
            required: true,
            pattern: new RegExp(/^\d+$/),
            message: "Wrong phone number format!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>
    </Form>
        
            
    )
}
export default RegisterPage;