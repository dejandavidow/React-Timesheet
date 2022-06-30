import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const ResetPassword = () => {
    const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='mx-auto loginform'>
        </div>
        <Button type='link' onClick={() => navigate("/timesheets")}>Back to home</Button>
    </div>
  )
}

export default ResetPassword