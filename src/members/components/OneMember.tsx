import { message } from 'antd'
import React from 'react'
import { CloseButton, ListGroup } from 'react-bootstrap'

import { MemberModel } from '../model/MemberModel'
import { deleteCategory } from '../service/member-service'
type MemberProps =
{
    member:{
    id:string | undefined,
    name:string,
    username:string,
    password:string,
    email:string,
    hours:number,
    status:string,
    role:string,
    },
    childToParent : (member:MemberModel) => void,
    setClientDeleted:(isDeleted:boolean) => void,
    handleShow:() => void
    setIsloaded:(c:boolean) => void
}
const OneMember = ({member,childToParent,setClientDeleted,setIsloaded} : MemberProps) => {
    const deleteHandler = (id:string | undefined) =>
    {
        deleteCategory(id).then( res =>
          {
            if(!res)
            {
              setIsloaded(false)
            }
            setClientDeleted(true);
            message.success("Member deleted successfully")
          })
    }
  return (
    <>
    <ListGroup.Item key={member.id} className="listhover"><button onClick={() => childToParent(member)} className="btnlist">{member.name}</button><CloseButton onClick={() => deleteHandler(member.id)} className="xdugme"/></ListGroup.Item>
    </>
  )
}

export default OneMember