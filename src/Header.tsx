import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import './App.css';
import { logout } from './Auth/auth-service/AuthService';
type User =
{
  name:string,
  role:string
}
const Header = () => {
  const [currentUser,setCurrentUser] = useState<User | undefined>(undefined)
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || "")
    if(user)
    {
    setCurrentUser(user)
    setShowAdminBoard(user.role === 'admin' ? true:false)
    }
  }, [])
  
  const navigate = useNavigate()
  const handleLogout = () =>
  {
  logout();
  navigate('/login')
  }
  const content = (
    <div>
      <Button style={{color:'orange',textDecoration:'none'}} variant='link' onClick={() => navigate('/forgot-password')}>Reset password</Button>
    </div>
    )
  return (
    <>
    <div className='container' style={{marginTop:'2vh'}}>
    <div style={{display:'flex',flexDirection:'row',float:'right'}}>
    <Popover placement='bottom' content={content} trigger='click'>
    <Button style={{float:'right',color:'black',background:'none',border:'none'}}>{currentUser?.name}</Button>
    </Popover>
    <Button  style={{float:'right',background:'none',border:'none',color:'black'}} className='loghover' onClick={handleLogout}>Logout</Button>
    </div>
    </div>
    <br/>
    <div className='container margin'>
      <Nav variant="tabs" className="me-auto justify-content-end">
      <LinkContainer to='/timesheets'>
      <Nav.Link className='link-decor navlink'>TimeSheet</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/categories'>
      <Nav.Link className='link-decor navlink'>Category</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/clients'>
      <Nav.Link className='link-decor navlink'>Client</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/projects'>
      <Nav.Link className='link-decor navlink'>Project</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/members'>
      <Nav.Link className='link-decor navlink'>Team Member</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/reports'>
      <Nav.Link className='link-decor navlink'>Reports</Nav.Link>
      </LinkContainer>
      {
         showAdminBoard && (
          <LinkContainer to='/admin'>
          <Nav.Link className='link-decor navlink'>Admin</Nav.Link>
          </LinkContainer>
        )
      }
    </Nav>
    </div>
    </>
  )
}

export default Header;