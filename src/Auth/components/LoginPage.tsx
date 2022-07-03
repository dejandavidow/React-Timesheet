import { Button, Form, Input, message, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../auth-service/AuthService'

const LoginPage = () => {
  const navigate = useNavigate()
    const [form] = useForm();
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)
    const handleLogin = () =>
    {
      Auth({username,password}).then((e) =>{
          navigate('/timesheets')
        }
      ,(e) =>
      {
        setError(e)
        form.resetFields()
      }
      );
  }
  return (
    <div className='container'>
      <div className='loginform mx-auto'>
      <span style={{color:'red'}}>{error}</span>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={handleLogin}
        form={form}
        >
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