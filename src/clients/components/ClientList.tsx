import React, { useEffect, useState } from "react";
import { Button, ListGroup,Modal,Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ClientModel } from "../model/clientModel";
import { countClients,getClients, UpdateClient } from "../service/client.service";
import './Client.css';
import OneClient from "./OneClient";

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

export const ClientList = (props: ClientListProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [childClient,setChildClient] = useState<ClientModel>(new ClientModel('', '', '', '', '', ''));

  const [pageCount,setpageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  useEffect(() => {
    getClients(props.searchTerm, props.letter, pageNumber,pageSize).then(data => setClients(data));
    countClients(props.searchTerm, props.letter).then(data => setpageCount(Math.ceil(data/pageSize)));
    props.setNewClientCreated(false);
    props.setClientDeleted(false);
    props.setClientUpdated(false);
}, [props.newClientCreated, props.searchTerm,props.clientDeleted,props.clientUpdated,pageNumber,pageCount, props.letter])
const handlePageClick = (e:{selected: number}) =>
{
setPageNumber(e.selected+1);
}

const childToParent = (client:ClientModel) => 
{
   setChildClient(client);
   handleShow();
}
const updateClientHandler = () =>
{
     setChildClient(childClient);
      UpdateClient(childClient,childClient.id);
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
  // countFilterClients(props.letter).then(data => setpageCount(Math.ceil(data/pageSize)));
  props.setLetter(button.value);
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
      {clients.map((client) =>
      <OneClient 
      key={client.id} 
      client={client}
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
      <Modal.Title>Update client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={childClient?.clientName} name="clientName" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Adress:</Form.Label>
            <Form.Control type="text" value={childClient?.adress} name="adress" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" value={childClient?.city} name="city" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Zip/Postal Code:</Form.Label>
            <Form.Control type="text" value={childClient?.postalCode} name="postalCode" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Country</Form.Label>
            <Form.Select aria-label="Default select example" value={childClient?.country} onChange={handleChange} name="country">
            <option>Open this select menu</option>
            <option value="Serbia">Serbia</option>
            <option value="Kongo">Kongo</option>
            <option value="China">China</option>
            </Form.Select>
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