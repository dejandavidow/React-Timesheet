import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { MemberModel } from '../model/MemberModel'
import { countCategory, getCategories, UpdateCategory } from '../service/member-service'
import OneMember from './OneMember'
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
const MemberList = (props: ClientListProps) => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [members, setMembers] = useState<MemberModel[]>([]);
  const [childClient,setChildClient] = useState<MemberModel>(new MemberModel('', '', '', '', '', '','',''));

  const [pageCount,setpageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  useEffect(() => {
    getCategories(props.searchTerm, props.letter, pageNumber,pageSize).then(data => setMembers(data));
    countCategory(props.searchTerm, props.letter).then(data => setpageCount(Math.ceil(data/pageSize)));
    props.setNewClientCreated(false);
    props.setClientDeleted(false);
    props.setClientUpdated(false);
}, [props.newClientCreated, props.searchTerm,props.clientDeleted,props.clientUpdated,pageNumber,pageCount, props.letter])
const handlePageClick = (e:{selected: number}) =>
{
setPageNumber(e.selected+1);
}
const childToParent = (client:MemberModel) => 
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
    [evt.target.name]: value,
    [evt.target.name]: value,
    [evt.target.name]: value,
    [evt.target.name]: value,
    [evt.target.name]: value
  });
}
const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) =>
{
  props.setSearchTerm('')
  const button: HTMLButtonElement = event.currentTarget;
  props.setLetter(button.value);
}
  return (
    <>
    <div className='container'>
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
      {members.map((member) =>
      <OneMember
      key={member.id} 
      member={member}
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
      <Modal.Title>Update member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={childClient?.name} name="name" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={childClient?.username} name="username" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={childClient?.email} name="email" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Hours:</Form.Label>
            <Form.Control type="text" value={childClient?.hours} name="hours" onChange={handleChange}/>
            </Form.Group>
             
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Status:</Form.Label>
            <br></br>
            <Form.Check inline label="Active" type="radio" name="status" value='active' onChange={handleChange}/>
            <Form.Check inline label="Inactive" type="radio" name="status" value='inactive' onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Role:</Form.Label>
            <br></br>
            <Form.Check 
            inline 
            label="Worker"
             type="radio"
             name='role' 
             aria-label="radio 1"
             value={childClient?.role} 
             onChange={handleChange}
             />

            <Form.Check inline 
            label="Admin" 
            name='role'
            type="radio" 
            aria-label="radio 1" 
            value={childClient?.role}
            onChange={handleChange}
            />
            </Form.Group>

      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="warning"  onClick={updateClientHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}

export default MemberList