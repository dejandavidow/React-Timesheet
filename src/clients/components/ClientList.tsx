import { Button, Form, Input, message, Modal, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import {ListGroup} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ClientModel } from "../model/clientModel";
import { countClients,getClients, UpdateClient } from "../service/client.service";
import './Client.css';
import OneClient from "./OneClient";
const { Option } = Select;
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
  isLoaded:boolean
  setIsLoaded:(c:boolean) => void
}

export const ClientList = (props: ClientListProps) => {
  const [form] = useForm()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [pageCount,setpageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [clientName,setclientName] = useState("");
  const [adress,setAdress] = useState("");
  const [city,setCity] = useState("");
  const [postalCode,setpostalCode] = useState("");
  const [country,setCountry] = useState("");
  const [id,setId] = useState<string | undefined>(undefined)
  const [error,setError] = useState<any>(null)
  useEffect(() => {
    getClients(props.searchTerm, props.letter, pageNumber,pageSize).then(data =>{
      props.setIsLoaded(true)
       setClients(data)
    }
       ,(err) =>{
        props.setIsLoaded(true)
        setError(err)
       });
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
  setId(client.id)
  setclientName(client.clientName)
  setAdress(client.adress)
  setpostalCode(client.postalCode)
  setCity(client.city)
  setCountry(client.country)
   handleShow();
}
const updateClientHandler = () =>
{
      UpdateClient({id,clientName,adress,city,postalCode,country},id).then(e =>
        {
          if(!e)
          {
            props.setIsLoaded(false)
          }
          props.setClientUpdated(true);
          handleClose();
          message.success("Client updated successfully")
        })
}
const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) =>
{
  props.setSearchTerm('')
  const button: HTMLButtonElement = event.currentTarget;
  props.setLetter(button.value);
}
if(error)
{
  return <div>{error.message}</div>
}
else if(!props.isLoaded)
{
  return <Spin tip="Loading..." style={{margin:"5vh 60vh"}}/>
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
      setIsLoaded={props.setIsLoaded}
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
          <Modal
        title="Update Client"
        visible={show}
        footer={false}
        keyboard={true}
        closable={false}
      >
       <Form 
       form={form} 
       autoComplete='off'
       onFinish={updateClientHandler}
       labelCol={{ span: 8 }}
       wrapperCol={{ span: 16 }}
       >
          <Form.Item label="Name" rules={[{ required: true,message:'Please input client name'},{type:'string',min:3,message:'Name must be atleast 3 characters.'}]}>
              <Input onChange={(value) => setclientName(value.target.value)} value={clientName}/>
          </Form.Item>
          <Form.Item label="Adress">
              <Input onChange={(value) => setAdress(value.target.value)} value={adress}/>
          </Form.Item>
          <Form.Item  label="City">
              <Input onChange={(value) => setCity(value.target.value)} value={city}/>
          </Form.Item>
          <Form.Item  label="Postal Code">
              <Input onChange={(value) => setpostalCode(value.target.value)} value={postalCode}/>
          </Form.Item>
          <Form.Item  label="Country" >
                  <Select
                    placeholder="Select country"
                    allowClear
                    onChange={(value) => setCountry(value)}
                    value={country}
                  >
                    <Option key='1' value='Serbia'>Serbia</Option>
                    <Option key='2' value='Macedonia'>Macedonia</Option>
                    <Option key='3' value='Bulgaria'>Bulgaria</Option>
                    <Option key='4' value='Greece'>Greece</Option>
                    <Option key='5' value='Montenegro'>Montenegro</Option>
                  </Select>
                </Form.Item>
        <Button htmlType='submit' type='primary'>Update</Button>
        <Button onClick={handleClose} style={{marginLeft:"1vh"}}>Close</Button>
       </Form>
      </Modal>
      </div>
      </>
  )
}