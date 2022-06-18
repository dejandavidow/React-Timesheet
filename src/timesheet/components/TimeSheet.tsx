import React, {ChangeEvent, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { PostTimeSheet } from "../service/timesheet-service";
import { TsModel } from "../model/TsModel";
import FullCalendar, {DateSelectArg,EventContentArg} from "@fullcalendar/react";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import "./style.css";
import { Modal, Form, Button } from "react-bootstrap";
import { ClientModel } from "../../clients/model/clientModel";
import { CategoryModel } from "../../categories/model/CategoryModel";
import { getCategoriesList } from "../../categories/category-service/category.service";
import { getClientList } from "../../clients/service/client.service";
import { ProjectModel } from "../../projects/model/ProjectModel";
import { getProjectList } from "../../projects/service/project-service";


const TimeSheet = React.memo(() => {

  // const [timesheets, setTimeSheets] = useState<TsModel[]>([]);
  // const [totalTime, setTotalTime] = useState(0);
  const [show, setShow] = useState(false);
  const [categoryId,setcategoryId] = useState("");
  const [clientId,setclientId] = useState("");
  const [projectId,setprojectId] = useState("");
  const [categories,setCategories] = useState<CategoryModel[]>([]);
  const [clients,setClients] = useState<ClientModel[]>([]);
  const [projects,setProjects] = useState<ProjectModel[]>([]);
  const [description,setDescription] = useState("");
  const [time,setTime] = useState("");
  const [overTime,setoverTime] = useState("");
  const [date,setDate] = useState("");
  const [validated, setValidated] = useState(false);
  const [tsCreated,settsCreated] = useState<boolean>(false)
  const handleClose = () => {
    setValidated(false);
    setShow(false);
  }
  const handleShow = () =>{
     setShow(true);
  }
    useEffect(() => {
      //getTimeSheets().then(data => setTimeSheets(data))
    },[tsCreated]);

    const renderEventContent = (e: EventContentArg) => {
      return (
        <>
          <b style={{backgroundColor:e.event.extendedProps.time > 4 ? 'lightgreen' : 'red',width:'100%',height:'100%'}}>Hours: {e.event.extendedProps.time}</b>
        </>
      );
    };
    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let date = selectInfo.startStr
        setDate(date)
        handleShow()
    }
    const handlePost = (event : React.FormEvent<HTMLFormElement> & React.MouseEvent<HTMLButtonElement> & React.BaseSyntheticEvent) =>
    {
      const form = event.currentTarget;
    if (form.checkValidity() === false) 
    {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
    }
      setValidated(true);
      const request :TsModel=
      {
        id:undefined,
        description,
        time,
        overTime,
        date,
        clientId,
        projectId,
        categoryId
      }
      PostTimeSheet(request);
      settsCreated(true);
    }
    const getCategoriesHandler = () =>
    {
      getCategoriesList().then(data => setCategories(data))
    }
    const getClientsHandler = () =>
    {
      getClientList().then(data => setClients(data))
    }
    const getProjectsHandler = () =>
    {
      getProjectList().then(data => setProjects(data))
    }
    // const totalTimeHandler = () =>{
    //   const timearray : number[]= []
    //   {timesheets.map((ts) =>
    //     {
    //       timearray.push(Number(ts.time))
    //     }
    //     )}
    //   var sum = timearray.reduce(function(a, b){
    //       return a + b;
    //   }, 0);
    //   setTotalTime(sum)
    // }
  return <div className="container bgcolor">
       <div>
      <h2>TimeSheet</h2>
      <hr></hr>
    </div>
      <>
      <FullCalendar
        plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin,bootstrap5Plugin]}
        themeSystem='bootstrap5'
        initialView='dayGridMonth'
        headerToolbar={{
          left:'prev',
          right:'next',
          center:'title'
        }}
        footerToolbar={{
          left:'dayGridMonth',
          right:'listWeek'
        }}
        events={'https://localhost:44381/api/TimeSheet/'}
        eventContent={renderEventContent}
        select={handleDateSelect}
        height={600}
        displayEventTime={false}
        selectable={true}
        firstDay={1}
        hiddenDays={[6]}
        defaultAllDay={true}
        eventDisplay='list-item'
      />
      <div className="container totalhours">
        <p>
          Total Hours:<span style={{ color: "darkorange" }}>0</span>
        </p>
      </div>
      </>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new TimeSheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description:</Form.Label>
              <Form.Control 
              type="text"
              value={description}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time:</Form.Label>
              <Form.Control
              required 
              type="text"
              value={time}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Over Time:</Form.Label>
              <Form.Control 
              type="text"
              value={overTime}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setoverTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select category</Form.Label>
            <Form.Select required onClick={getCategoriesHandler} aria-label="Default select example" value={categoryId} onChange={(e : ChangeEvent<HTMLSelectElement>) => setcategoryId(e.target.value)}>
            <option>Open to select category</option>
            {categories.map((category) =>
            <option value={category.id}>{category.name}</option>
            )}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select client</Form.Label>
            <Form.Select required onClick={getClientsHandler} aria-label="Default select example" value={clientId} onChange={(e : ChangeEvent<HTMLSelectElement>) => setclientId(e.target.value)}>
            <option>Open to select client</option>
            {clients.map((client) =>
            <option value={client.id}>{client.clientName}</option>
            )}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select Project</Form.Label>
            <Form.Select required onClick={getProjectsHandler} aria-label="Default select example" value={projectId} onChange={(e : ChangeEvent<HTMLSelectElement>) => setprojectId(e.target.value)}>
            <option>Open to select project</option>
            {projects.map((project) =>
            <option value={project.id}>{project.projectName}</option>
            )}
            </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePost}>Create TimeSheet</Button>
        </Modal.Footer>
      </Modal>
    </div>
});
export default TimeSheet
