import React from 'react';
import { Button, Col, Nav, Row} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import './App.css';
import { logout } from './Auth/auth-service/AuthService';

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () =>
  {
  logout();
  navigate('/login')
  }
  const user = JSON.parse(localStorage.getItem('user') || "")
  return (
    <>
    <div className='container' style={{marginTop:'2vh'}}>
    <Button  style={{float:'right',background:'none',border:'none',color:'black'}} onClick={handleLogout}> Logout</Button>
    <br/><br/><h6 style={{float:'right',color:'black'}}>{user.name}</h6>
    </div>
    <div className='container margin'>
    <Nav variant="tabs" className="me-auto justify-content-end">
      <LinkContainer to='/timesheets'>
      <Nav.Link className='link-decor navlink' >TimeSheet</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/categories'>
      <Nav.Link className='link-decor navlink' >Category</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/clients'>
      <Nav.Link className='link-decor navlink' >Client</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/projects'>
      <Nav.Link className='link-decor navlink' >Project</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/members'>
      <Nav.Link className='link-decor navlink' >Team Member</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/reports'>
      <Nav.Link className='link-decor navlink' >Reports</Nav.Link>
      </LinkContainer>
    </Nav>
    </div>
    </>
  )
}

export default Header;