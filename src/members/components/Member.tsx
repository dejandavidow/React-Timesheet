import React, { useState } from "react";
import Header from "../../Header";
import Memberheader from "./Memberheader";
import MemberList from "./MemberList";

const Member = () => {
  const [newClientCreated, setNewClientCreated] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientDeleted, setclientDeleted] = useState<boolean>(false);
  const [clientUpdated, setClientUpdated] = useState<boolean>(false);
  const [letter, setLetter] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Header />
      <div className="container bgcolor">
        <Memberheader
          setNewClientCreated={setNewClientCreated}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setLetter={setLetter}
          setIsLoaded={setIsLoaded}
        />
        <MemberList
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
  );
};

export default Member;
