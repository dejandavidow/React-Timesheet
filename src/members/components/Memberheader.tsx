
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, {useState} from 'react'
import { MemberModel } from '../model/MemberModel';
import { PostCategory } from '../service/member-service';
type ClientHeaderProps = {
  setNewClientCreated: (isCreated: boolean) => void,
  searchTerm:string,
  setSearchTerm:(src:string) => void,
  setLetter:(l:string) => void
  setIsLoaded:(c:boolean) => void
}

const Memberheader = (props: ClientHeaderProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    form.resetFields()
    setShow(false)
  }
  const handleShow = () => setShow(true);
  const [form] = useForm()
  const [name,setName] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [hours,setHours] = useState(0);
  const [status,setStatus] = useState("");
  const [role,setRole] = useState("");
  const CreateClientHandler = () =>
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
    PostCategory(request).then(x =>
      {
        if(!x)
        {
          props.setIsLoaded(false)
        }
        props.setNewClientCreated(true);
        handleClose();
        message.success("Member created succesfully")
      }
    )}
  return (
      <>
      <h2>Members</h2>
      <hr></hr>
      <Modal
        title="Create New Member"
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
          <Form.Item name="Name" label="Name" rules={[{ required: true,message:'Please input your name'},{type:'string',min:3,message:'Name must be atleast 3 characters.'}]}>
              <Input onChange={(value) => setName(value.target.value)} value={name}/>
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true,message:"Please input your email"}]}>
              <Input onChange={(value) => setEmail(value.target.value)} value={email} type='email'/>
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true,min:3,message:'Please input username'}]}>
              <Input onChange={(value) => setUserName(value.target.value)} value={username}/>
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true,message:'Please input password'},{type:'string',min:8,message:'Password must be atleast 8 characters.'}]}>
              <Input.Password onChange={(value) => setPassword(value.target.value)} value={password}/>
          </Form.Item>
          <Form.Item name="hours" label="Hours">
              <Input onChange={(value) => setHours(Number(value.target.value))} value={hours}/>
          </Form.Item>
          <Form.Item label='Status' name='status' rules={[{required:true,message:'Please choose status'}]}>
                <Radio.Group onChange={(e) => setStatus(e.target.value)} value={status}>
                <Radio value='active'>Active</Radio>
                <Radio value='inactive'>Inactive</Radio>
              </Radio.Group>
          </Form.Item>
          <Form.Item label='Role' rules={[{required:true,message:'Please choose role'}]} name='role'>
                <Radio.Group onChange={(e) => setRole(e.target.value)} value={role} >
                <Radio value='worker'>Worker</Radio>
                <Radio value='admin'>Admin</Radio>
              </Radio.Group>
          </Form.Item>
        <Button htmlType='submit' type='primary'>Create</Button>
        <Button onClick={handleClose} style={{marginLeft:"1vh"}}>Close</Button>
       </Form>
      </Modal>
    <div className='pozadina'>
    <button className='dugme' onClick={handleShow}>Create new Member</button>
    <input type='search' className='searchinput' placeholder='Search' value={props.searchTerm} onChange={(e) => {props.setSearchTerm(e.target.value); props.setLetter('')}}></input>
    </div>
    </>
  )
}

export default Memberheader
