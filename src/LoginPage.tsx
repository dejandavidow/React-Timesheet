import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { LoginMember } from './members/service/member-service'
type LoginProps = {
    setToken:(c:string) => void
}
const LoginPage = ({setToken}:LoginProps) => {
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const handleLogin = () =>
    {
    LoginMember({username,password}).then(data => setToken(data))
    }
  return (
    <div className='container'>
    <div className='mx-auto loginform'>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off">
        <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e) => setUserName(e.target.value)} value={username}/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)} value={password}/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onSubmit={handleLogin}>
          Login
        </Button>
      </Form.Item>
        </Form>
    </div>
    </div>
  )
}

export default LoginPage