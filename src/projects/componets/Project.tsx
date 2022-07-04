import React, { useState } from 'react'
import Header from '../../Header';
import Projectheader from './Projectheader'
import ProjectList from './ProjectList';

const Project = () => {
    const [newClientCreated, setNewClientCreated] = useState<boolean>(false);
    const [searchTerm,setSearchTerm] = useState("");
    const [clientDeleted,setclientDeleted] = useState<boolean>(false);
    const [clientUpdated,setClientUpdated] = useState<boolean>(false);
    const [letter,setLetter] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
  return (<>
  <Header/>
    <div className='container bgcolor'>
       <Projectheader
       setNewClientCreated={setNewClientCreated}
       searchTerm={searchTerm}
       setSearchTerm={setSearchTerm}
       setLetter={setLetter}
       setIsLoaded={setIsLoaded}
       />
       <ProjectList
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
       isLoaded={isLoaded}
       setIsLoaded={setIsLoaded}
       />
    </div>
    </>
  )
}

export default Project