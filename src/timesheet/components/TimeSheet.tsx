import React, { ChangeEvent, useEffect, useState } from "react";
import TimeSheetHeader from "./TimeSheetHeader";
import "antd/dist/antd.css";
import { getTimeSheets, PostTimeSheet } from "../service/timesheet-service";
import { TsModel } from "../model/TsModel";
import FullCalendar, { DateSelectArg, EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import "./style.css";
import { Modal, Form, Button } from "react-bootstrap";
import { ClientModel } from "../../clients/model/clientModel";
import { CategoryModel } from "../../categories/model/CategoryModel";
import { getCategories, getCategoriesList } from "../../categories/category-service/category.service";
import { getClientList } from "../../clients/service/client.service";
import { ProjectModel } from "../../projects/model/ProjectModel";
import { getProjectList } from "../../projects/service/project-service";
const TimeSheet = () => {
  const [timesheets, setTimeSheets] = useState<TsModel[]>([]);
  const [totalTime, setTotalTime] = useState(0);
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
  const handleClose = () => {
    setValidated(false);
    setShow(false);
  }
  const handleShow = () =>{
     setShow(true);
  }
    useEffect(() => {
      getTimeSheets().then((data) => setTimeSheets(data));
    }, []);
    const renderEventContent = (e: EventContentArg) => {
      setTotalTime(e.event.extendedProps.time);
      return (
        <>
          <b>Hours: {e.event.extendedProps.time}</b>
        </>
      );
    };
    const handleDateSelect = (selectInfo: DateSelectArg) => {
      handleShow()
      setDate(selectInfo.startStr)
    }
    const handlePost = (event : React.FormEvent<HTMLFormElement> & React.MouseEvent<HTMLButtonElement> & React.BaseSyntheticEvent) =>
    {
      const form = event.currentTarget;
    if (form.checkValidity() === false && clientId === "") 
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
  return (
    <div className="container bgcolor">
      <TimeSheetHeader />
      <FullCalendar
        plugins={[dayGridPlugin,dayGridPlugin,interactionPlugin]}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        events={timesheets}
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
      />
      <div className="container totalhours">
        <p>
          Total Hours:<span style={{ color: "darkorange" }}>{totalTime}</span>
        </p>
      </div>
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
  );
};
export default TimeSheet;
