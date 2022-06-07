import { Button, Form, Modal} from 'react-bootstrap';
import React, {ChangeEvent, useState} from 'react'

import { MemberModel } from '../model/MemberModel';
import { PostCategory } from '../../categories/category-service/category.service';

type ClientHeaderProps = {
  setNewClientCreated: (isCreated: boolean) => void,
  searchTerm:string,
  setSearchTerm:(src:string) => void,
  setLetter:(l:string) => void
}

const Memberheader = (props: ClientHeaderProps) => {
    
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name,setName] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [hours,setHours] = useState("");
  const [status,setStatus] = useState("worker");
  const [role,setRole] = useState("");
  

  const CreateClientHandler = (event : React.FormEvent<HTMLFormElement> & React.MouseEvent<HTMLButtonElement> ) =>
  {
    const request :MemberModel=
    {
      id:undefined,
      name,
      username,
      password,
      email,
      hours,
      status,
      role
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) 
    {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    PostCategory(request);
    props.setNewClientCreated(true);
    setName('');
    setUserName('');
    setPassword('');
    setEmail('');
    setHours('');
    setStatus('');
    setRole('');
    handleClose();
  }

  const statusHandler = (e : React.ChangeEvent<HTMLInputElement>) =>
  {
      setStatus(e.target.value);
  }
  return (
      <>
      <h2>Members</h2>
      <hr></hr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            required 
            type="text" 
            value={name} 
            onChange={(e : ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <Form.Control.Feedback type='invalid'>Name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            required 
            type="text" 
            value={username} 
            onChange={(e : ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} />
            <Form.Control.Feedback type='invalid'>username is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            required 
            type="password" 
            value={password} 
            onChange={(e : ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <Form.Control.Feedback type='invalid'>Password is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email:</Form.Label>
            <Form.Control
            type="text" 
            value={email} 
            onChange={(e : ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <Form.Control.Feedback type='invalid'>Email is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Hours:</Form.Label>
            <Form.Control
            required 
            type="text" 
            value={hours}
            pattern="[0-9]*" 
            onChange={(e : ChangeEvent<HTMLInputElement>) => setHours(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Status:</Form.Label>
            <br></br>
            <Form.Check defaultChecked inline label="Active" type="radio" name="status" value='active' onChange={statusHandler}/>
            <Form.Check inline label="Inactive" type="radio" name="status" value='inactive' onChange={statusHandler}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Role:</Form.Label>
            <br></br>
            <Form.Check 
            inline
            defaultChecked
            label="Worker"
             type="radio"
             name='role' 
             aria-label="radio 1"
             value='worker' 
             onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
             />

            <Form.Check inline 
            label="Admin" 
            name='role'
            type="radio" 
            aria-label="radio 1" 
            value='admin' 
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
            />
            </Form.Group>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateClientHandler}>Create Member</Button>
        </Modal.Footer>
      </Modal>
    <div className='pozadina'>
    <button className='dugme' onClick={handleShow}>Create new Member</button>
    <input type='search' className='searchinput' placeholder='Search' value={props.searchTerm} onChange={(e) => {props.setSearchTerm(e.target.value); props.setLetter('')}}></input>
    </div>
    </>
  )
}

export default Memberheader
