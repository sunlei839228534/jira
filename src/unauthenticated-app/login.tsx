import { Button, Form ,Input } from "antd"
import { LongButton } from "."
import { useAuth } from "../context/auth-context"
import { useAsync } from "../utils/use-async"


export const LoginScreen =({onError}: {onError: (error: Error) => void}) => {
  const {login,user} = useAuth()
  const { run , isLoading} = useAsync(undefined, {throwOnError: true})

  const handleSubmit = async (values:  {username: string,password: string}) => {  
    try {
      await run(login(values))
    }catch (e) {
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
    <LongButton htmlType={"submit"} type="primary" loading={isLoading}>登录</LongButton>
  </Form>
}