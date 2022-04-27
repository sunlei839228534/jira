import { useAuth } from "../context/auth-context"
import { Button, Form ,Input } from "antd"
import { LongButton } from "."
import { useAsync } from "../utils/use-async"

export const RegisterScreen =({onError}: {onError: (error: Error) => void}) => {
  const {register,user} = useAuth()
  const { run, isLoading } = useAsync(undefined,{throwOnError:true})

  const handleSubmit = async ({ cpassword ,...values}:  {username: string,password: string,cpassword: string}) => {
    if(cpassword !== values.password) {
      onError(new Error('两次输入的密码不匹配!'))
      return 
    }  
    try{
      await run(register(values))
    } catch (e) {
      onError(e as Error)
    }
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{required: true,message: '请输入用户名'}]}>
      <Input placeholder="请输入用户名" id={'username'} type="text"></Input>
    </Form.Item>
    <Form.Item name="password" rules={[{required:true,message: '请输入密码'}]}>
    <Input placeholder="请输入密码" id={'password'} type="password"></Input>
    </Form.Item>
    <Form.Item name="cpassword" rules={[{required:true,message: '请输入密码'}]}>
      <Input placeholder="请再次输入密码" id={'cpassword'} type="password"></Input>
    </Form.Item>
    <LongButton htmlType={"submit"} type="primary" loading={isLoading} >注册</LongButton>
  </Form>
}