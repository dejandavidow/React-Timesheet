import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import LoginPage from './LoginPage';
type AuthProps = {
    children:JSX.Element
}
const ProtectedRoute = ({children}:AuthProps) => {
{

    if(localStorage.getItem('user') !== null)
    return children? children : <Outlet/>;
    else
    return <Navigate to='/login'/>
}
}

export default ProtectedRoute
