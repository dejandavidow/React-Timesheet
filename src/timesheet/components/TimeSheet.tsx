import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {getTimeSheets, PostTimeSheet } from "../service/timesheet-service";
import { TsModel } from "../model/TsModel";
import FullCalendar, {DateSelectArg,DatesSetArg, EventContentArg, ViewMountArg} from "@fullcalendar/react";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import "./style.css";
import { ClientModel } from "../../clients/model/clientModel";
import { CategoryModel } from "../../categories/model/CategoryModel";
import { getCategoriesList } from "../../categories/category-service/category.service";
import { getClientList } from "../../clients/service/client.service";
import { ProjectModel } from "../../projects/model/ProjectModel";
import { getProjectList } from "../../projects/service/project-service";
import Header from "../../Header";
import { Button, Form, Input, message, Modal, Select } from "antd";
const { Option } = Select;
const TimeSheet = React.memo(() => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [categoryId,setcategoryId] = useState("");
  const [clientId,setclientId] = useState("");
  const [projectId,setprojectId] = useState("");
  const [categories,setCategories] = useState<CategoryModel[]>([]);
  const [clients,setClients] = useState<ClientModel[]>([]);
  const [projects,setProjects] = useState<ProjectModel[]>([]);
  const [description,setDescription] = useState("");
  const [time,setTime] = useState("");
  const [overTime,setoverTime] = useState(0);
  const [date,setDate] = useState("");
  const [tsCreated,settsCreated] = useState(false)
  const [start,setStart] = useState("");
  const [end,setEnd] = useState("");
  const [timesheets,setTimeSheets] = useState<TsModel[]>([]);
  const [load,setLoad] = useState(false);
  const [total,setTotal] = useState(0);
  useEffect(() => {
    setTotal(totalTimeHandler());
      if(load)
      {
        getTimeSheets(start,end).then(data => setTimeSheets(data))
      }
      return       
  }, [start,end,tsCreated,timesheets.length])
  const totalTimeHandler = () =>{
    const timearray : number[]= []
    {timesheets.map((ts) =>
      {
        timearray.push(Number(ts.time))
      }
      )}
    var sum = timearray.reduce(function(a, b){
        return a + b;
    }, 0);
    return sum;
  }
  const handleRangeChange = (arg:DatesSetArg) =>
  {
    setStart(arg.view.activeStart.toDateString())
    setEnd(arg.view.activeEnd.toDateString())
  }
  const handleMountView = (e:ViewMountArg) =>
  {
    setLoad(true);
  }
  const handleShow = () =>{
    setVisible(true);
  }

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
    const handlePost = () =>
    {
      const post : TsModel = {
        id:undefined,
        description,
        time,
        overTime,
        date,
        clientId,
        projectId,
        categoryId
      }
      PostTimeSheet(post)
      setTimeout(() =>
      {
        settsCreated(true)
        setVisible(false)
        message.success("Timesheet created successfully",1000)
      },1000)
      form.resetFields()
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
    const handleCancel = () => {
      form.resetFields();
      setVisible(false);
    }
  return <>
  <Header/>
  <div className="container bgcolor">
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
        events={timesheets}
        eventContent={renderEventContent}
        select={handleDateSelect}
        height={600}
        displayEventTime={false}
        selectable={true}
        firstDay={1}
        hiddenDays={[6]}
        defaultAllDay={true}
        eventDisplay='list-item'
        showNonCurrentDates={false}
        datesSet={handleRangeChange}
        viewDidMount={handleMountView}
        dayMaxEvents={1}
      />
      <div className="container totalhours">
        <p>
          Total Hours:<span style={{ color: "darkorange" }}>{total}</span>
        </p>
      </div>
      </>
    </div>
    <Modal
        title="Create New Category"
        visible={visible}
        footer={false}
        keyboard={true}
        closable={false}
      >
       <Form onFinish={handlePost} form={form} autoComplete='off'>
          <Input.Group compact>
                <Form.Item name="Client" label="Client"  style={{width:350}} className='margins' rules={[{required:true}]}>
                  <Select
                    placeholder="Select client"
                    onClick={getClientsHandler}
                    onChange={(value) => setclientId(value)}
                  >
                    {clients.map((client) =>
                    <Option key={client.id} value={client.id}>{client.clientName}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="Category" label="Category" style={{width:350}} className='margins' rules={[{required:true}]}>
                  <Select
                    placeholder="Select category"
                    onClick={getCategoriesHandler}
                    onChange={(value) => setcategoryId(value)}
                  >
                    {categories.map((category) =>
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="Project" label="Project" style={{width:350}} className='margins' rules={[{required:true}]}>
                  <Select
                    placeholder="Select project"
                    onClick={getProjectsHandler}
                    onChange={(value) => setprojectId(value)}
                  >
                    {projects.map((project) =>
                    <Option key={project.id} value={project.id}>{project.projectName}</Option>
                    )}
                  </Select>
                </Form.Item>
                </Input.Group>
                    <Form.Item name={"Hours"} label="Hours" rules={[{ required: true }]}>
                             <Input onChange={(value) => setTime(value.target.value)} value={time} style={{width:"250px"}}/>
                    </Form.Item>
                    <Form.Item name={"Overhours"} label="Over Hours">
                             <Input onChange={(value) => setoverTime(Number(value.target.value))} value={overTime} style={{width:"250px"}}/>
                    </Form.Item>
                    <Form.Item name={"Description"} label="Description">
                             <Input onChange={(value) => setDescription(value.target.value)} value={description} style={{width:"250px"}}/>
                    </Form.Item>
      <Button htmlType='submit' type='primary'>Create</Button>
      <Button onClick={handleCancel} style={{marginLeft:"1vh"}}>Cancel</Button>
       </Form>
      </Modal>
    </>
    
});
export default TimeSheet
