import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { MemberModel } from '../model/MemberModel'
import { changePasswordAsync, getMemberbyEmail } from '../service/member-service'
const ResetPassword = () => {
    const [password,setPassword] = useState("")
    const [conpassword,setconPassword] = useState("")
    const [email,setEmail] = useState("")
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [valid,setValid] = useState(false)
    const [userEmail,setUserEmail] = useState<MemberModel | undefined>(undefined)
    const [checked,setChecked] = useState(false)
    const [changed,setChanged] = useState(false)
    const [success,setSuccess] = useState(true)
    const navigate = useNavigate();
    const changePassword = () =>
    {
      setValid(false)
      if(password !== conpassword)
      {
        form.resetFields()
        return setValid(true)
      }
      setValid(false)
      changePasswordAsync(userEmail?.email,password)
      form.resetFields()
      setChanged(true)
    }
    const handleCheckEmail = () =>
    {
    getMemberbyEmail(email).then(data => {
      setUserEmail(data)
      if(data.email)
      {
        setChecked(true)
        setSuccess(false)
      }
    }
      )
    }
    
  return ( 
    <div className='container'>
      <br/>
      <br/>
     {
      valid && 
      <Alert
        message="Error"
        description="Passwords dont match!"
        type="error"
        closable
      />
      }
      {
      changed && 
      <Alert
        message="Success"
        description="Password successfuly has been changed."
        type="success"
        closable
      />
      }
        <div className='mx-auto loginform'>
       {
        success &&
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form2}
            onFinish={handleCheckEmail}
            autoComplete='off'
          >
            <Form.Item
            label="Email"
            name='email'
            rules={[{required:true}]}
            >
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Check email
                    </Button>
                  </Form.Item>
          </Form>
}
                { checked &&
                    <Form
                  name="basic2"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={changePassword}
                  autoComplete="off"
                  form={form}
                >
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Password is required', }]}
                  >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Item>

                  <Form.Item
                    label="Confirm password"
                    name="confirmpassword"
                    rules={[{ required: true, message: 'Confirm password is required' }]}
                  >
                    <Input.Password value={conpassword} onChange={(e) => setconPassword(e.target.value)} />
                  </Form.Item>


                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
}
        </div>
        <Button type='link' onClick={() => navigate("/timesheets")}>Back to home</Button>
    </div>
      
  )
}

export default ResetPassword