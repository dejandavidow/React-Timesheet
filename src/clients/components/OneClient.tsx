import { message } from "antd"
import { useState } from "react"
import { CloseButton, ListGroup } from "react-bootstrap"
import { ClientModel } from "../model/clientModel"
import {deleteClient} from '../service/client.service'
type ClientProps =
{
    client:{
    id:string | undefined,
    clientName:string,
    adress:string,
    city:string,
    postalCode:string,
    country:string
    },
    handleShow : () => void,
    childToParent : (client:ClientModel) => void,
    setClientDeleted:(isDeleted:boolean) => void
}
const OneClient = ({client,childToParent,setClientDeleted}:ClientProps) => {
  const [error,setError] = useState(null)
    const deleteHandler = (id:string | undefined) =>
    {
        deleteClient(id).then(e =>
          {
            setClientDeleted(true);
            message.success("Client deleted successfully")
          })
    }
  return (
    <>
    <ListGroup.Item key={client.id} className="listhover"><button onClick={() => childToParent(client)} className="btnlist">{client.clientName}</button><CloseButton onClick={() => deleteHandler(client.id)} className="xdugme"/></ListGroup.Item>
    </>
  )
}


export default OneClient