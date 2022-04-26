import { useAuth } from "../context/auth-context"
import { Button, Form ,Input } from "antd"
import { LongButton } from "."

export const RegisterScreen =() => {
  const {register,user} = useAuth()
  const handleSubmit = (values:  {username: string,password: string}) => {  
    register(values)
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{required: true,message: '请输入用户名'}]}>
      <Input placeholder="请输入用户名" id={'username'} type="text"></Input>
    </Form.Item>
    <Form.Item name="password" rules={[{required:true,message: '请输入密码'}]}>
    <Input placeholder="请输入密码" id={'password'} type="password"></Input>
    </Form.Item>
    <LongButton htmlType={"submit"} type="primary" >注册</LongButton>
  </Form>
}