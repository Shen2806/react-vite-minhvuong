import {Button , Form, Input, notification} from "antd";
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
        form = {form}
        layout="vertical"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        > <div style={{
            margin: "50px",
            // display: "flex",
            // flexDirection:"column"
        }}>
        <Form.Item
      label="Username"
      name="username" 
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
        <Form.Item
      label="FullName"
      name="fullName" 
      rules={[{ required: true, message: 'Please input your FullName!' }]}
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
      rules={[ {
        required: true,
        pattern: new RegExp(/\d+/g),
        message: "Wrong format!"
      }
]}
    >
      <Input />
    </Form.Item>
           
                <Button 
                type="primary"
                onClick = {()=> form.submit()}
                >Register 
                </Button>
        </div>
    </Form>
        
            
    )
}
export default RegisterPage;