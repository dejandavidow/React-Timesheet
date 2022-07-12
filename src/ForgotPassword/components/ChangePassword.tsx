import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { resetpassword } from '../service/pwservice';

const ChangePassword = () => {
    const [form] = useForm();
    const [password,setPassword] = useState("")
    const [confirmpassword,setconPassword] = useState("")
    const [token,setToken] = useState("")
    const [error,setError] = useState<any>(null)
    const navigate = useNavigate();
    const changePassword= () =>
    {
     resetpassword({token,password,confirmpassword})
     .then( (res) =>
     {
      if(res)
      {
        if(res.errors.Token)
        {
          setError(res.errors.Token)
        }
        else if(res.errors.Password)
        {
          setError(res.errors.Password)
        }
        else 
        {
          setError(res.errors.ConfirmPassword)
        }
      }
      else
      {
        message.success('Password changed successfully',1)
        setTimeout(() => {
          navigate('/timesheets')
        }, 2000);
      }
     })
    }
  return (
    <>
    <div className='mx-auto loginform'>
        {error ? <p style={{color:'red',marginLeft:'100px'}}>{error}</p> : null}
                <Form
                  name="basic2"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={changePassword}
                  autoComplete="off"
                  form={form}
                >
                    <Form.Item label='Token' name='token'>
                        <Input value={token} onChange={e => setToken(e.target.value)}/>
                    </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    //rules={[{ required: true, message: 'Password is required', }]}
                  >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Item>

                  <Form.Item
                    label="Confirm password"
                    name="confirmpassword"
                    //rules={[{ required: true, message: 'Confirm password is required' }]}
                  >
                    <Input.Password value={confirmpassword} onChange={(e) => setconPassword(e.target.value)} />
                  </Form.Item>


                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                </div>
    </>
  )
}

export default ChangePassword