import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {getTimeSheets, PostTimeSheet } from "../service/timesheet-service";
import { TsModel } from "../model/TsModel";
import FullCalendar, {DateSelectArg,DatesSetArg,EventContentArg, EventInput, ViewMountArg} from "@fullcalendar/react";
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
import { Button, Form, Input, message, Modal, Select, Spin } from "antd";
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
  const [timesheets,setTimeSheets] = useState<EventInput[]>([]);
  const [load,setLoad] = useState(false);
  const [total,setTotal] = useState(0);
  const [error,setError] = useState<any>(null)
  const [isLoaded,setIsLoaded] = useState(false)
  
  useEffect(() => {
          if(load)
          {
          getTimeSheets(start,end).then(
            data => {
            setIsLoaded(true)
            setTimeSheets(data)
            setTotal(totalTimeHandler(data));
            },err => {
              setIsLoaded(true)
              setError(err)
            }
            )
      }  
  }, [start,end,tsCreated])
  const totalTimeHandler = (data:TsModel[]) =>{
    const timearray : number[]= []
    {data.map((ts) =>
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
    setStart(arg.startStr.slice(0,10))
    setEnd(arg.endStr.slice(0,10)); 
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
          <b style={{backgroundColor:e.event.extendedProps.time > 4 ? 'rgba(0,255,0,0.4)' : 'rgba(255,0,0,0.4)',width:'100%',height:'100%',padding:'10px 0px',margin:0}}>Hours: {e.event.extendedProps.time}</b>   
        </>
      );
  }
    const handleDateSelect = (selectInfo: DateSelectArg) => {
      let selectedDate = selectInfo.startStr
      setDate(selectedDate)
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
      PostTimeSheet(post).then(x =>
        {
          settsCreated(true)
          message.success("Timesheet created successfully",1)
        })
        settsCreated(false)
      form.resetFields()
      handleCancel()
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
  {error ? message.warn(error.message) : null}
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
          right:'dayGridWeek'
        }}
        eventSources={[timesheets]}
        eventContent={renderEventContent}
        select={handleDateSelect}
        height={600}
        displayEventTime={false}
        selectable={true}
        hiddenDays={[0]}
        defaultAllDay={true}
        eventDisplay='list-item'
        datesSet={handleRangeChange}
        viewDidMount={handleMountView}
        dayMaxEvents={1}
        firstDay={1}
        showNonCurrentDates={false}
      />
      <div className="container totalhours">
        <p>
          Total Hours:<span style={{ color: "darkorange" }}>{total}</span>
        </p>
      </div>
      </>
    </div>
    <Modal
        title="Create New Timesheet"
        visible={visible}
        footer={false}
        keyboard={true}
        closable={false}
      >
       <Form onFinish={handlePost} 
            form={form}
             autoComplete='off'
            >
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
                             <Input onChange={(value) => setTime(value.target.value)} value={time} style={{width:250}}/>
                    </Form.Item>
                    <Form.Item name={"Overhours"} label="Over Hours">
                             <Input onChange={(value) => setoverTime(Number(value.target.value))} value={overTime} style={{width:250}}/>
                    </Form.Item>
                    <Form.Item name={"Description"} label="Description">
                             <Input onChange={(value) => setDescription(value.target.value)} value={description} style={{width:250}}/>
                    </Form.Item>
      <Button htmlType='submit' type='primary'>Create</Button>
      <Button onClick={handleCancel} style={{marginLeft:"1vh"}}>Cancel</Button>
       </Form>
      </Modal>
    </>
    
});

export default TimeSheet
