import { Alert, Button, Form, Input, message, Modal, Radio, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, {useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../Auth/auth-service/AuthService'
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
    setIsLoaded:(c:boolean) => void
    isLoaded:boolean
  }
const MemberList = (props: ClientListProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form] = useForm()
  const handleShow = () => setShow(true);
  const handleClose = () =>{
    setShow(false);
    form.resetFields();
  }

  const [members, setMembers] = useState<MemberModel[]>([]);
  const [pageCount,setpageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [isAdmin,setIsAdmin] = useState(false)
  const [id,setId] = useState<string | undefined>(undefined)
  const [name,setName] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [hours,setHours] = useState(0);
  const [status,setStatus] = useState("");
  const [role,setRole] = useState("");
  const [error,setError] = useState<any>(null)
  useEffect(() => {
    getCategories(props.searchTerm, props.letter, pageNumber,pageSize).then(data => 
      {
        props.setIsLoaded(true);
          setMembers(data);
      }
      ,(err) =>{
        props.setIsLoaded(true)
        setError(err)
      });
    countCategory(props.searchTerm, props.letter).then(data => setpageCount(Math.ceil(data/pageSize)));
}, [props.newClientCreated, props.searchTerm,props.clientDeleted,props.clientUpdated,pageNumber, props.letter])
const handlePageClick = (e:{selected: number}) =>
{
setPageNumber(e.selected+1);
}
const childToParent = (client:MemberModel) => 
{
  setId(client.id)
  setName(client.name)
  setUserName(client.username)
  setPassword(client.password)
  setEmail(client.email)
  setRole(client.role)
  setStatus(client.status)
   handleShow();
}
const updateClientHandler = () =>
{
      UpdateCategory({id,name,username,email,password,hours,status,role},id).then
      (
        x =>
        {
          props.setClientUpdated(true);
          handleClose()
          message.success("Member updated successfully")
        }
      )
      props.setClientUpdated(false)
}

const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) =>
{
  props.setSearchTerm('')
  const button: HTMLButtonElement = event.currentTarget;
  props.setLetter(button.value);
}
const HandleClick = () =>
{
  const user = getCurrentUser()
  if(user.role === 'admin')
  navigate("/admin")
  else
  {
    handleClose();
    setTimeout(() => {
      setIsAdmin(true)
    }, 500);
  }
}
if(error)
{
  return <div>{error.message}</div>
}
else if (!props.isLoaded)
{
  return <Spin tip="Loading..." style={{margin:"5vh 60vh"}}/>
}
 return (
  
    <>
    {
      isAdmin ?
    <Alert
    message="Forbidden"
    description="Only admins can reset passwords!"
    type="error"
    closable
    onClose={() => setIsAdmin(false)}
    />
    :null
    }
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
      setIsloaded={props.setIsLoaded}
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
                  title="Update Member"
                  visible={show}
                  footer={false}
                  keyboard={true}
                  closable={false}
                >
                <Form 
                form={form} 
                onFinish={updateClientHandler}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                >
                    <Form.Item label="Name" rules={[{ required: true,message:'Please input your name'},{type:'string',min:3,message:'Name must be atleast 3 characters.'}]}>
                        <Input onChange={(value) => setName(value.target.value)} value={name}/>
                    </Form.Item>
                    <Form.Item label="Email" rules={[{ required: true,message:"Please input your email"}]}>
                        <Input onChange={(value) => setEmail(value.target.value)} value={email} type='email'/>
                    </Form.Item>
                    <Form.Item label="Username" rules={[{ required: true,min:3,message:'Please input username'}]}>
                        <Input onChange={(value) => setUserName(value.target.value)} value={username}/>
                    </Form.Item>
                    <Form.Item  label="Hours">
                        <Input onChange={(value) => setHours(Number(value.target.value))} value={hours}/>
                    </Form.Item>
                    <Form.Item label='Status' rules={[{required:true,message:'Please choose status'}]}>
                          <Radio.Group onChange={(e) => setStatus(e.target.value)} value={status}>
                          <Radio value='active'>Active</Radio>
                          <Radio value='inactive'>Inactive</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='Role' rules={[{required:true,message:'Please choose role'}]}>
                          <Radio.Group onChange={(e) => setRole(e.target.value)} value={role} >
                          <Radio value='worker'>Worker</Radio>
                          <Radio value='admin'>Admin</Radio>
                        </Radio.Group>
                    </Form.Item>
                  <Button htmlType='submit' type='primary'>Update</Button>
                  <Button htmlType='button' type='primary' danger style={{marginLeft:"1vh"}}  onClick={HandleClick}>Reset Password</Button>
                  <Button onClick={handleClose} style={{marginLeft:"1vh"}}>Close</Button>
                </Form>
                </Modal>   
  </div>
    </>
  )
}

export default MemberList