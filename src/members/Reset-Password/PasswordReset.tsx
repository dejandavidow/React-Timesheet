import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
const ResetPassword = () => {
    const [password,setPassword] = useState("")
    const [conpassword,setconPassword] = useState("")
    const [email,setEmail] = useState("")
    const [form] = Form.useForm();
    const [valid,setValid] = useState(false)
    const navigate = useNavigate();
    const handlePassword = () =>
    {
      if(password !== conpassword)
      {
        setValid(true)
        form.resetFields()
      }
  
    }
    const handleCheckEmail = () =>
    {

    }
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    /* eslint-enable no-template-curly-in-string */

  return ( 
    <div className='container'>
      <br/>
      <br/>
     {
     valid ? <Alert
        message="Error"
        description="Passwords dont match!"
        type="error"
        closable
      />
      : 
      null
      }

        <div className='mx-auto loginform'>
                    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                  <Form.Item name='email' label="Email" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Check Email
                    </Button>
                  </Form.Item>
                  <Form.Item name='password' label="New Password">
                    <Input.Password/>
                  </Form.Item>
                  <Form.Item name='confirmpassword' label="Confirm Password">
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
        </div>
        <Button type='link' onClick={() => navigate("/timesheets")}>Back to home</Button>
    </div>
      
  )
}

export default ResetPassword