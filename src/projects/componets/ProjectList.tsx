import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { ClientModel } from '../../clients/model/clientModel'
import { getClientList } from '../../clients/service/client.service'
import { MemberModel } from '../../members/model/MemberModel'
import { getMembers } from '../../members/service/member-service'
import { ProjectModel } from '../model/ProjectModel'
import { countCategory, getCategories, UpdateCategory } from '../service/project-service'
import OneProject from './OneProject'
type ClientListProps = {
    newClientCreated: boolean,
    searchTerm:string,
    setNewClientCreated: (isCreated: boolean) => void,
    clientDeleted:boolean,
    setClientDeleted:(isDeleted: boolean) => void
    clientUpdated:boolean,
    setClientUpdated:(isUpdated: boolean) => void,
    setSearchTerm:(c:string) => void,
    letter: string,
    setLetter: (l:string) => void
  }
const ProjectList = (props:ClientListProps) => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [childClient,setChildClient] = useState<ProjectModel>(new ProjectModel('', '', '', '', '', '',''));
  const [validated, setValidated] = useState(false);
  const [pageCount,setpageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [members,setMembers] = useState<MemberModel[]>([]);
  const [clients,setClients] = useState<ClientModel[]>([]);
  useEffect(() => {
    getCategories(props.searchTerm, props.letter, pageNumber,pageSize).then(data => setProjects(data));
    countCategory(props.searchTerm, props.letter).then(data => setpageCount(Math.ceil(data/pageSize)));
    props.setNewClientCreated(false);
    props.setClientDeleted(false);
    props.setClientUpdated(false);
}, [props.newClientCreated, props.searchTerm,props.clientDeleted,props.clientUpdated,pageNumber,pageCount, props.letter])
const handlePageClick = (e:{selected: number}) =>
{
setPageNumber(e.selected+1);
}

const childToParent = (client:ProjectModel) => 
{
   setChildClient(client);
   handleShow();
}
const updateClientHandler = () =>
{
     setChildClient(childClient);
      UpdateCategory(childClient,childClient.id);
      props.setClientUpdated(true);
      handleClose();
}
const handleChange = (evt : React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) =>
{
  const value = evt.target?.value;
  setChildClient({
    ...childClient,
    [evt.target.name]: value
  });
}
const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) =>
{
  props.setSearchTerm('')
  const button: HTMLButtonElement = event.currentTarget;
  props.setLetter(button.value);
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
            <div className="container">
            <div className="filteri">
        <button type="button" onClick={handleFilter} value="a" className="filter-buttons">A</button>
        <button type="button" onClick={handleFilter} value="b" className="filter-buttons">B</button>
        <button type="button" onClick={handleFilter} value="c" className="filter-buttons">C</button>
        <button type="button" onClick={handleFilter} value="d" className="filter-buttons">D</button>
        <button type="button" onClick={handleFilter} value="e" className="filter-buttons">E</button>
        <button type="button" onClick={handleFilter} value="f" className="filter-buttons">F</button>
        <button type="button" onClick={handleFilter} value="g" className="filter-buttons">G</button>
        <button type="button" onClick={handleFilter} value="h" className="filter-buttons">H</button>
        <button type="button" onClick={handleFilter} value="i" className="filter-buttons">I</button>
        <button type="button" onClick={handleFilter} value="j" className="filter-buttons">J</button>
        <button type="button" onClick={handleFilter} value="k" className="filter-buttons">K</button>
        <button type="button" onClick={handleFilter} value="l" className="filter-buttons">L</button>
        <button type="button" onClick={handleFilter} value="m" className="filter-buttons">M</button>
        <button type="button" onClick={handleFilter} value="n" className="filter-buttons">N</button>
        <button type="button" onClick={handleFilter} value="o" className="filter-buttons">O</button>
        <button type="button" onClick={handleFilter} value="p" className="filter-buttons">P</button>
        <button type="button" onClick={handleFilter} value="q" className="filter-buttons">Q</button>
        <button type="button" onClick={handleFilter} value="r" className="filter-buttons">R</button>
        <button type="button" onClick={handleFilter} value="s" className="filter-buttons">S</button>
        <button type="button" onClick={handleFilter} value="t" className="filter-buttons">T</button>
        <button type="button" onClick={handleFilter} value="u" className="filter-buttons">U</button>
        <button type="button" onClick={handleFilter} value="v" className="filter-buttons">V</button>
        <button type="button" onClick={handleFilter} value="w" className="filter-buttons">W</button>
        <button type="button" onClick={handleFilter} value="x" className="filter-buttons">X</button>
        <button type="button" onClick={handleFilter} value="y" className="filter-buttons">Y</button>
        <button type="button" onClick={handleFilter} value="z" className="filter-buttons">Z</button>
          </div>
          <ListGroup className='listgroup'>
      {projects.map((project) =>
        <OneProject
        key={project.id} 
        project={project}
        handleShow={handleShow}
        childToParent={childToParent}
        setClientDeleted={props.setClientDeleted}
        />
      )}
      </ListGroup> 
      <ReactPaginate
         breakLabel="..."
         nextLabel="next>"
         onPageChange={handlePageClick}
         pageRangeDisplayed={pageSize}
         pageCount={pageCount}
         previousLabel="<previous"
         className="pagination"
         //renderOnZeroPageCount={null}
      />
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
          name='projectName' 
          required 
          type="text" 
          value={childClient?.projectName} 
          onChange={handleChange}/>
          <Form.Control.Feedback type='invalid'>Project Name is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description:</Form.Label>
          <Form.Control
          type="text"
          name='description' 
          value={childClient?.description} 
          onChange={handleChange}/>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Status:</Form.Label>
            <br></br>
            <Form.Check  inline label="Active" type="radio" name="status" value='active' onChange={handleChange}/>
            <Form.Check defaultChecked inline label="Inactive" type="radio" name="status" value='inactive' onChange={handleChange}/>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <br></br>
            <Form.Check inline label="Archive" type="radio" name="archive" value='archived' onChange={handleChange}/>
            </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select member</Form.Label>
            <Form.Select onClick={getMembersHandler} aria-label="Default select example" value={childClient.memberId} onChange={handleChange} name='memberId'>
            <option>Open menu</option>
            {members.map((member) =>
            <option value={member.id}>{member.name}</option>
            )}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select client</Form.Label>
            <Form.Select onClick={getClientsHandler} aria-label="Default select example" value={childClient.clientId} onChange={handleChange} name='clientId'>
            <option>Open menu</option>
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
        <Button variant="primary" onClick={updateClientHandler}>Update Project</Button>
      </Modal.Footer>
    </Modal>
            </div>
        </>

  )
}

export default ProjectList