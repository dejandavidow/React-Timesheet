import { Button, DatePicker, DatePickerProps, Form, Input, Select, Space} from 'antd'
import '../style.css'
import React, { useState } from 'react'
import { CategoryModel } from '../../categories/model/CategoryModel';
import { ClientModel } from '../../clients/model/clientModel';
import { ProjectModel } from '../../projects/model/ProjectModel';
import { getCategoriesList } from '../../categories/category-service/category.service';
import { getClientList } from '../../clients/service/client.service';
import { getProjectList } from '../../projects/service/project-service';
import { SearchOutlined } from '@ant-design/icons';
import { getFilteredTimeSheets, getPageCount } from '../../timesheet/service/timesheet-service';
import { ReportModel } from '../../timesheet/model/ReportModel';
import { MemberModel } from '../../members/model/MemberModel';
import { getMembers } from '../../members/service/member-service';
const { Option } = Select;
type TsProps ={
  setcategoryId: (c:string) => void,
  setprojectId: (c:string) => void,
  setclientId: (c:string) => void,
  setStartDate : (c:string) => void
  setEndDate :(c:string) => void,
  startDate:string,
  endDate:string,
  categoryId:string,
  projectId:string,
  clientId:string,
  setTimeSheets:(c:ReportModel[]) => void
  pageSize:number,
  pageNumber:number,
  setpageCount:(c:number) => void,
  setreFetch :(c:boolean) => void
  setmemberId :(c:string) => void,
  setIsLoaded:(c:boolean) => void
  setError:(c:any) => void
  memberId:string
  setCall:(c:boolean) => void
}
const SearchHeader = ({setCall,memberId,setError,setIsLoaded,setcategoryId,setprojectId,setclientId,setStartDate,setEndDate,startDate,endDate,clientId,projectId,categoryId,setTimeSheets,pageNumber,pageSize,setpageCount,setreFetch,setmemberId}:TsProps) => {
  const [form] = Form.useForm();
  const [categories,setCategories] = useState<CategoryModel[]>([]);
  const [clients,setClients] = useState<ClientModel[]>([]);
  const [projects,setProjects] = useState<ProjectModel[]>([]);;
  const [members,setMembers] = useState<MemberModel[]>([]);
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
  const getMembersHandler = () =>
  {
   getMembers().then(data => setMembers(data))
  }
  const handleStartPick: DatePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString)
  };
  const handleEndPick: DatePickerProps['onChange'] = (date, dateString) => {
    setEndDate(dateString)
  };
  const handleSearchCall = () =>
  {
    getFilteredTimeSheets(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize,memberId).then(data =>
      {
      setIsLoaded(true)
      setTimeSheets(data)
      setCall(true)
      }
      ,err =>
      {
        setIsLoaded(true)
        setError(err)
      })
    getPageCount(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize,memberId).then(data => setpageCount(data));
  }
  const ResetHandler = () =>
  {
    setreFetch(true)
    form.resetFields();
    setcategoryId("")
    setclientId("")
    setprojectId("")
    setStartDate("")
    setEndDate("")
    setmemberId("")
  }
  return (
    <>
        <h2>Reports</h2>
        <hr></hr>
        <div className='inputfield'>
                  <Form form={form}>
                    <Input.Group compact>
                  <Form.Item name="member" label="Member"  style={{width:350}} className='margins'>
                  <Select
                  onClick={getMembersHandler}
                    placeholder="Select team member"
                    allowClear
                    onChange={(value) => setmemberId(value)}
                  > 
                    {members.map((member) =>
                    <Option key={member.id} value={member.id}>{member.name}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="client" label="Client"  style={{width:350}} className='margins'>
                  <Select
                    placeholder="Select client"
                    allowClear
                    onClick={getClientsHandler}
                    onChange={(value) => setclientId(value)}
                  >
                    {clients.map((client) =>
                    <Option key={client.id} value={client.id}>{client.clientName}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="category" label="Category" style={{width:350}} className='margins'>
                  <Select
                    placeholder="Select category"
                    allowClear
                    onClick={getCategoriesHandler}
                    onChange={(value) => setcategoryId(value)}
                  >
                    {categories.map((category) =>
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                    )}
                  </Select>
                </Form.Item>
                </Input.Group>
                <Input.Group compact>
                <Form.Item name="project" label="Project" style={{width:350}} className='margins'>
                  <Select
                    placeholder="Select project"
                    allowClear
                    onClick={getProjectsHandler}
                    onChange={(value) => setprojectId(value)}
                  >
                    {projects.map((project) =>
                    <Option key={project.id} value={project.id}>{project.projectName}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label='Start Date' className='margins'>
                    <Space direction="vertical">
                      <DatePicker  style={{ width:350}} placeholder='Start Date' onChange={handleStartPick}/>
                  </Space>
                  </Form.Item>
                  <Form.Item label='End Date' className='margins'> 
                    <Space direction="vertical">
                        <DatePicker style={{ width:350 }} placeholder='End Date' onChange={handleEndPick}/>
                    </Space>
                    </Form.Item>
                    </Input.Group>
                  <div className='button-group'>
                        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearchCall}>
                                Search
                        </Button>
                        <Button htmlType="button" className='leftm' onClick={ResetHandler}>
                                Reset
                        </Button>
                  </div>
                  </Form>
                  </div>
      </>
  )
}

export default SearchHeader