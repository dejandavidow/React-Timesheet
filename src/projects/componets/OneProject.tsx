import { message } from 'antd'
import React from 'react'
import { CloseButton, ListGroup } from 'react-bootstrap'
import { ClientModel } from '../../clients/model/clientModel'
import { MemberModel } from '../../members/model/MemberModel'
import { ProjectModel } from '../model/ProjectModel'
import { deleteCategory } from '../service/project-service'
type ClientProps =
{
    project:{
    id:string | undefined,
    projectName:string,
    description:string,
    status:string,
    archive:string,
    memberId:string,
    clientId:string
    }
    handleShow : () => void,
    childToParent : (client:ProjectModel) => void,
    setClientDeleted:(isDeleted:boolean) => void
    setIsLoaded:(c:boolean) => void
}
const OneProject = ({project,childToParent,setClientDeleted,setIsLoaded}:ClientProps) => {
    const deleteHandler = (id:string | undefined) =>
    {
        deleteCategory(id).then(
          res =>
          {
            if(!res)
            {
              setIsLoaded(false)
            }
            setClientDeleted(true);
            message.success("Project deleted successfully")
          }
        )
    }
  return (
    <>
    <ListGroup.Item key={project.id} className="listhover"><button onClick={() => childToParent(project)} className="btnlist">{project.projectName}</button><CloseButton onClick={() => deleteHandler(project.id)} className="xdugme"/></ListGroup.Item>
    </>
  )
}

export default OneProject