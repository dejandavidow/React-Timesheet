import React, { ChangeEvent, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { ClientModel } from '../../clients/model/clientModel'
import { getClientList } from '../../clients/service/client.service'
import { MemberModel } from '../../members/model/MemberModel'
import { getCategories, getMembers } from '../../members/service/member-service'
import { ProjectModel } from '../model/ProjectModel'
import { PostCategory } from '../service/project-service'
type ClientHeaderProps = {
    setNewClientCreated: (isCreated: boolean) => void,
    searchTerm:string,
    setSearchTerm:(src:string) => void,
    setLetter:(l:string) => void
  }
const Projectheader = (props:ClientHeaderProps) => {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [projectName,setprojectName] = useState("");
    const [description,setDescription] = useState("");
    const [status,setStatus] = useState("inactive");
    const [archive,setArchive] = useState("no-archive");
    const [memberId,setmemberId] = useState("");
    const [clientId,setclientId] = useState("");
    const [members,setMembers] = useState<MemberModel[]>([]);
    const [clients,setClients] = useState<ClientModel[]>([]);

    const handleClose = () => {
      
        setValidated(false);
        setprojectName("");
        setDescription("");
        setStatus("");
        setArchive("");
        setmemberId("");
        setclientId("");
        setShow(false);
      }
      const CreateClientHandler = (event : React.FormEvent<HTMLFormElement> & React.MouseEvent<HTMLButtonElement> & React.BaseSyntheticEvent ) =>
  {
    const form = event.currentTarget;
    if (form.checkValidity() === false) 
    {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const request :ProjectModel=
    {
      id:undefined,
      projectName,
      description,
      status,
      archive,
      memberId,
      clientId,
    }
    PostCategory(request)
    props.setNewClientCreated(true);
  }
  const statusHandler = (e : React.ChangeEvent<HTMLInputElement>) =>
  {
      setStatus(e.target.value);
  }
  const getMembersHandler = () =>
  {
   getMembers().then(data => setMembers(data));
  }
  const getClientsHandler = () =>
  {
    getClientList().then(data => setClients(data))
  }
  return (
    <>
    <h2>Projects</h2>
    <hr></hr>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Project Name:</Form.Label>
          <Form.Control 
          required 
          type="text" 
          value={projectName} 
          onChange={(e : ChangeEvent<HTMLInputElement>) => setprojectName(e.target.value)}/>
          <Form.Control.Feedback type='invalid'>Project Name is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description:</Form.Label>
          <Form.Control
          type="text" 
          value={description} 
          onChange={(e : ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Status:</Form.Label>
            <br></br>
            <Form.Check  inline label="Active" type="radio" name="status" value='active' onChange={statusHandler}/>
            <Form.Check defaultChecked inline label="Inactive" type="radio" name="status" value='inactive' onChange={statusHandler}/>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <br></br>
            <Form.Check inline label="Archive" type="radio" name="archive" value='archived' onChange={(e: ChangeEvent<HTMLInputElement>) => setArchive(e.target.value)}/>
            </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select member</Form.Label>
            <Form.Select required isInvalid onClick={getMembersHandler} aria-label="Default select example" value={memberId} onChange={(e : ChangeEvent<HTMLSelectElement>) => setmemberId(e.target.value)}>
            <option>Open to select member</option>
            {members.map((member) =>
            <option value={member.id}>{member.name}</option>
            )}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select client</Form.Label>
            <Form.Select required isInvalid onClick={getClientsHandler} aria-label="Default select example" value={clientId} onChange={(e : ChangeEvent<HTMLSelectElement>) => setclientId(e.target.value)}>
            <option>Open to select client</option>
            {clients.map((client) =>
            <option value={client.id}>{client.clientName}</option>
            )}
            </Form.Select>
            </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={CreateClientHandler}>Create Project</Button>
      </Modal.Footer>
    </Modal>
  <div className='pozadina'>
  <button className='dugme' onClick={handleShow}>Create new Project</button>
  <input type='search' className='searchinput' placeholder='Search' value={props.searchTerm} onChange={(e) => {props.setSearchTerm(e.target.value); props.setLetter('')}}></input>
  </div>
  </>
  )
}

export default Projectheader