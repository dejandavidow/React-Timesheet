
import React, {useState} from 'react'
import { PostClient } from '../service/client.service';
import { ClientModel } from '../model/clientModel';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

type ClientHeaderProps = {
  setNewClientCreated: (isCreated: boolean) => void,
  searchTerm:string,
  setSearchTerm:(src:string) => void,
  setLetter:(l:string) => void
  setIsLoaded:(c:boolean) => void
}

const Clientheader = (props: ClientHeaderProps) => {
  const [form] = useForm()
  const [show, setShow] = useState(false);
  const handleClose = () => {
    form.resetFields()
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [clientName,setclientName] = useState("");
  const [adress,setAdress] = useState("");
  const [city,setCity] = useState("");
  const [postalCode,setpostalCode] = useState("");
  const [country,setCountry] = useState("");
  const CreateClientHandler = () =>
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
    PostClient(request).then(e =>
      {
        props.setNewClientCreated(true);
        message.success("Client created successfully",2)
      }
      ) 
      handleClose();
      props.setNewClientCreated(false)
  }
  return (
      <>
      <h2>Clients</h2>
      <hr></hr>
      <Modal
        title="Create new Client"
        visible={show}
        footer={false}
        keyboard={true}
        closable={false}
      >
       <Form 
       form={form} 
       autoComplete='off'
       onFinish={CreateClientHandler}
       labelCol={{ span: 8 }}
       wrapperCol={{ span: 16 }}
       >
          <Form.Item name="clientName" label="Name" rules={[{ required: true,message:'Please input client name'},{type:'string',min:3,message:'Name must be atleast 3 characters.'}]}>
              <Input onChange={(value) => setclientName(value.target.value)} value={clientName}/>
          </Form.Item>
          <Form.Item name="adress" label="Adress">
              <Input onChange={(value) => setAdress(value.target.value)} value={adress}/>
          </Form.Item>
          <Form.Item name="city" label="City">
              <Input onChange={(value) => setCity(value.target.value)} value={city}/>
          </Form.Item>
          <Form.Item name="postalCode" label="Postal Code">
              <Input onChange={(value) => setpostalCode(value.target.value)} value={postalCode}/>
          </Form.Item>
          <Form.Item name="country" label="Country" >
                  <Select
                    placeholder="Select country"
                    allowClear
                    onChange={(value) => setCountry(value)}
                  >
                    <Option key='1' value='Serbia'>Serbia</Option>
                    <Option key='2' value='Macedonia'>Macedonia</Option>
                    <Option key='3' value='Bulgaria'>Bulgaria</Option>
                    <Option key='4' value='Greece'>Greece</Option>
                    <Option key='5' value='Montenegro'>Montenegro</Option>
                  </Select>
                </Form.Item>
        <Button htmlType='submit' type='primary'>Create</Button>
        <Button onClick={handleClose} style={{marginLeft:"1vh"}}>Close</Button>
       </Form>
      </Modal>
    <div className='pozadina'>
    <button className='dugme' onClick={handleShow}>Create new Client</button>
    <input type='search' className='searchinput' placeholder='Search' value={props.searchTerm} onChange={(e) => {props.setSearchTerm(e.target.value); props.setLetter('')}}></input>
    </div>
    </>
  )
}

export default Clientheader
