import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { PostCategory } from '../category-service/category.service';
import { CategoryModel } from '../model/CategoryModel';
type CategoryHeaderProps = {
  setNewCategoryCreated: (isCreated: boolean) => void,
  searchTerm:string,
  setSearchTerm:(src:string) => void,
  setLetter:(l:string) => void
}

const CategoryHeader = ({setNewCategoryCreated,searchTerm,setSearchTerm,setLetter}:CategoryHeaderProps) => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setValidated(false);
    setName('');
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [name,setName] = useState("");
  const CreateCategoryHandler = (event : React.FormEvent<HTMLFormElement> & React.MouseEvent<HTMLButtonElement> & React.BaseSyntheticEvent<any>) =>
  {
    const request :CategoryModel=
    {
      id:undefined,
      name
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) 
    {
      event.stopPropagation();
      event.preventDefault();
    }
    setValidated(true);
    PostCategory(request);
    setNewCategoryCreated(true);
  }
  return (
    <div>
         <>
      <h2>Categories</h2>
      <hr></hr>
      <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>Create new Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control required type="text" value={name} onChange={(e : ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please enter category name
          </Form.Control.Feedback>
          </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={CreateCategoryHandler}>
          Create Category
        </Button>
      </Modal.Footer>
    </Modal>
    <div className='pozadina'>
    <button className='dugme' onClick={handleShow}>Create new Category</button>
    <input type='search' className='searchinput' placeholder='Search' value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value);setLetter('')}}></input>
    </div>
    </>
    </div>
  )
}

export default CategoryHeader