import { Button, Form, FormControlProps, InputGroup, Modal} from 'react-bootstrap';
import React, {useState} from 'react'
import { PostClient } from '../service/client.service';
import { ClientModel } from '../model/clientModel';

type ClientHeaderProps = {
  setNewClientCreated: (isCreated: boolean) => void,
  searchTerm:string,
  setSearchTerm:(src:string) => void,
  setLetter:(l:string) => void
}

const Clientheader = (props: ClientHeaderProps) => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clientName,setclientName] = useState("");
  const [adress,setAdress] = useState("");
  const [city,setCity] = useState("");
  const [postalCode,setpostalCode] = useState("");
  const [country,setCountry] = useState("");
  const CreateClientHandler = (event : React.FormEvent<HTMLFormElement> & React.MouseEvent<HTMLButtonElement> ) =>
  {
    const request :ClientModel=
    {
      id:undefined,
      clientName,
      adress,
      city,
      postalCode,
      country
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) 
    {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    PostClient(request);
    props.setNewClientCreated(true);
    setclientName('');
    setAdress('');
    setCity('');
    setpostalCode('');
    setCountry('');
    handleClose();
  }
  return (
      <>
      <h2>Clients</h2>
      <hr></hr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form validated={validated} onSubmit={CreateClientHandler}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            required 
            type="text" 
            value={clientName} 
            onChange={(e) => setclientName(e.target.value)}/>
            <Form.Control.Feedback type='invalid'>Name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Adress:</Form.Label>
            <Form.Control
            required 
            type="text" 
            value={adress} 
            onChange={(e) => setAdress(e.target.value)} />
            <Form.Control.Feedback type='invalid'>Adress is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Zip/Postal Code:</Form.Label>
            <Form.Control type="text" value={postalCode}  onChange={(e) => setpostalCode(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Country</Form.Label>
            <Form.Select aria-label="Default select example" value={country} onChange={(e) => setCountry(e.target.value)}>
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
          <Button variant="primary" type='submit'>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    <div className='pozadina'>
    <button className='dugme' onClick={handleShow}>Create new Client</button>
    <input type='search' className='searchinput' placeholder='Search' value={props.searchTerm} onChange={(e) => {props.setSearchTerm(e.target.value); props.setLetter('')}}></input>
    </div>
    </>
  )
}

export default Clientheader
