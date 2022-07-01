import { Alert } from 'antd';
import React, { useState } from 'react'
import { getCurrentUser } from './Auth/auth-service/AuthService'
import {useNavigate} from 'react-router-dom'
import ResetPassword from './members/Reset-Password/PasswordReset';
const AdminComponent = () => {
    const navigate = useNavigate()
    const user = getCurrentUser();
    const onClose = () =>
    {
        navigate('/timesheets')
    }
    if(user.role === 'admin')
    {
        return (
            <div className='container'>
                {
                    <ResetPassword/>
                }
                </div>
          )
    }
    return(
        <div className='container'>
        <Alert
        message="Forbidden"
        description="Only admins can access this route."
        type="error"
        closable
        onClose={onClose}
      />
      </div>
    )
}

export default AdminComponent