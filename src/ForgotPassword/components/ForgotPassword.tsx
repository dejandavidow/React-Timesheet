import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react'
import { forgotpassword } from '../service/pwservice';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [form] = useForm();
  const [email,setEmail] = useState("")
  const [error,setError] = useState<any>(null)
  const navigate = useNavigate();
  const checkEmail = () =>
  {
     forgotpassword({email}).then(err =>
      {
        if(err)
        {
          setError(err.ErrorMessage)
        }
        else{
          navigate('/reset-password')
        }
      })
  }
  return (
    <>
    <div className='mx-auto loginform'>
      {error ? <p style={{color:'red',marginLeft:'100px'}}>{error}</p> : null}
   <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            onFinish={checkEmail}
            autoComplete='off'
          >
            <Form.Item
            label="Email"
            name='email'
            rules={[{required:true,message:'Email is required.'}]}
            >
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email adress'/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                  <Button type="primary" htmlType="button" onClick={() => navigate('/timesheets')}>
                      Back
                    </Button>
          </Form>
    </div>
    </>
  )
}

export default ForgotPassword