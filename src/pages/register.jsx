import {Button , Form, Input} from "antd";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const onFinish = (values) =>{
        console.log(">> check ", values)
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
    //   rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
        <Form.Item
      label="FullName"
      name="fullName" 
    //   rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
        <Form.Item
      label="Email"
      name="email" 
    //   rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
        <Form.Item
      label="Password"
      name="password" 
    //   rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input.Password />
    </Form.Item>
        <Form.Item
      label="Phone Number"
      name="phone" 
    //   rules={[{ required: true, message: 'Please input your username!' }]}
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