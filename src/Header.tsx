import React from 'react'
import { Nav } from 'react-bootstrap'

const Header = () => {
  return (
  <div>
        <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
    <Nav.Link href="home">TimeSheets</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/clients">Clients</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link >Categories</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link >Projects</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link >Reports</Nav.Link>
  </Nav.Item>
</Nav>
  </div>
  )
}

export default Header;