import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'

const LoginPage = () => {
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const handleLogin = () =>
    {

    }
  return (
    <div className='container'>
    <div className='mx-auto loginform'>
        <Form
        onSubmitCapture={handleLogin}
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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
        </Form>
    </div>
    </div>
  )
}

export default LoginPage