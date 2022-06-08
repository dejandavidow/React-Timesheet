import React from 'react';
import { Container, Nav} from 'react-bootstrap'
import { Link} from 'react-router-dom';
import './App.css';
const Header = () => {
  return (
  <div className='App'>
    <Container className='margin'>
    <Nav variant="tabs" className="me-auto justify-content-end">
      <Nav.Link className="navlink"><Link className='link-decor' to="categories">Category</Link></Nav.Link>
      <Nav.Link className="navlink"><Link className='link-decor' to="clients">Clients</Link></Nav.Link>
      <Nav.Link className="navlink"><Link className='link-decor' to="members">Members</Link></Nav.Link>
      <Nav.Link className="navlink"><Link className='link-decor' to="projects">Projects</Link></Nav.Link>
    </Nav>
    </Container>
  </div>
  )
}

export default Header;