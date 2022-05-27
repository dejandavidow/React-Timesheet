import { Button, Form, Modal } from 'react-bootstrap'

const CategoryHeader = () => {
  return (
    <div>
         <>
      <h2>Clients</h2>
      <hr></hr>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Create new client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control required type="text"/>
            <Form.Control.Feedback>Enter username</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Adress:</Form.Label>
            <Form.Control required type="text"/>
            <Form.Control.Feedback>Enter adress</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City</Form.Label>
            <Form.Control type="text"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Zip/Postal Code:</Form.Label>
            <Form.Control type="text"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Country</Form.Label>
            <Form.Select aria-label="Default select example" >
            <option>Open this select menu</option>
            <option value="Serbia">Serbia</option>
            <option value="Kongo">Kongo</option>
            <option value="China">China</option>
            </Form.Select>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    <div className='pozadina'>
    <button className='dugme'>Create new Client</button>
    <input type='search' className='searchinput' placeholder='Search'></input>
    </div>
    </>
  )
    </div>
  )
}

export default CategoryHeader