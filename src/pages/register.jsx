import {Button , Form, Input, notification,  Row, Col, Divider} from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router-dom";
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
      style={{ margin: "10px" }} // căn giữa form
    >
      <h3 style={{textAlign:"center"}}>Account Register</h3>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your Full Name!' }]}
          >
            <Input />
          </Form.Item>
          </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input />
          </Form.Item>
          </Col>
      </Row>  
          
        
      <Row justify={"center"}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password />
          </Form.Item>
          </Col>
      </Row>
        
      <Row justify={"center"}>
        <Col xs={24} md={6}>
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
          </Col>
      </Row> 
        
          
      <Row justify={"center"}>  
        <Col xs={24} md={6}>
          <div>
            <Button
              onClick={()=> form.submit()}
              type="primary" htmlType="submit" block>
              Register
            </Button>
          </div>
          <Divider /> 
          <div>Already have an account? <Link to ={'/login'}>Sign in here </Link></div>
        </Col>
          
      </Row>
      
    </Form>
        
            
    )
}
export default RegisterPage;