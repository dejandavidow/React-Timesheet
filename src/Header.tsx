import React from 'react';
import { Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import './App.css';
const Header = () => {
  return (
    <div className='container margin'>
    <Nav variant="tabs" className="me-auto justify-content-end">
      <LinkContainer to='timesheets'>
      <Nav.Link className='link-decor navlink' >TimeSheet</Nav.Link>
      </LinkContainer>
      <LinkContainer to='categories'>
      <Nav.Link className='link-decor navlink' >Category</Nav.Link>
      </LinkContainer>
      <LinkContainer to='clients'>
      <Nav.Link className='link-decor navlink' >Client</Nav.Link>
      </LinkContainer>
      <LinkContainer to='projects'>
      <Nav.Link className='link-decor navlink' >Project</Nav.Link>
      </LinkContainer>
      <LinkContainer to='members'>
      <Nav.Link className='link-decor navlink' >Team Member</Nav.Link>
      </LinkContainer>
      <LinkContainer to='reports'>
      <Nav.Link className='link-decor navlink' >Reports</Nav.Link>
      </LinkContainer>
    </Nav>
    </div>
  )
}

export default Header;