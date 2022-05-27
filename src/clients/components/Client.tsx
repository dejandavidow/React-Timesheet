import {useState } from 'react';
import Clientheader from './Clientheader'
import { ClientList } from './ClientList'
const Client = () => {
  const [newClientCreated, setNewClientCreated] = useState<boolean>(false);
  const [searchTerm,setSearchTerm] = useState("");
  const [clientDeleted,setclientDeleted] = useState<boolean>(false);
  const [clientUpdated,setClientUpdated] = useState<boolean>(false);
  const[letter,setLetter] = useState("");
  return(
  <div className='container'>
    <Clientheader
     setNewClientCreated={setNewClientCreated}
     searchTerm={searchTerm}
     setSearchTerm={setSearchTerm}
     setLetter={setLetter}
     />
    <ClientList
    setNewClientCreated={setNewClientCreated} 
    newClientCreated={newClientCreated}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    clientDeleted={clientDeleted}
    setClientDeleted={setclientDeleted}
    setClientUpdated={setClientUpdated}
    clientUpdated={clientUpdated}
    letter={letter}
    setLetter={setLetter}
    />
  </div>
  )
}

export default Client