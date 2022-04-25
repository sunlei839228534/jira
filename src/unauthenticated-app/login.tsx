import { Button, Form ,Input } from "antd"
import { useAuth } from "../context/auth-context"


export const LoginScreen =() => {
  const {login,user} = useAuth()
 

  const handleSubmit = (values:  {username: string,password: string}) => {  
    login(values)
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{required: true,message: '请输入用户名'}]}>
      <Input placeholder="请输入用户名" id={'username'} type="text"></Input>
    </Form.Item>
    <Form.Item name="password" rules={[{required:true,message: '请输入密码'}]}>
    <Input placeholder="请输入密码" id={'password'} type="password"></Input>
    </Form.Item>
    <Button htmlType={"submit"} type="primary" >登录</Button>
  </Form>
}