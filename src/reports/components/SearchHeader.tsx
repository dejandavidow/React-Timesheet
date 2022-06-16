import { Button, DatePicker, DatePickerProps, Select, Space } from 'antd'
import '../style.css'
import React, { useState } from 'react'
import { CategoryModel } from '../../categories/model/CategoryModel';
import { ClientModel } from '../../clients/model/clientModel';
import { ProjectModel } from '../../projects/model/ProjectModel';
import { getCategoriesList } from '../../categories/category-service/category.service';
import { getClientList } from '../../clients/service/client.service';
import { getProjectList } from '../../projects/service/project-service';
import { SearchOutlined } from '@ant-design/icons';
import { getFilteredTimeSheets } from '../../timesheet/service/timesheet-service';
import { TsModel } from '../../timesheet/model/TsModel';
import { FilterValue } from 'antd/lib/table/interface';
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
  clientId:string
  setTimeSheets:(c:TsModel[]) => void
}
const SearchHeader = ({setcategoryId,setprojectId,setclientId,setStartDate,setEndDate,startDate,endDate,clientId,projectId,categoryId,setTimeSheets}:TsProps) => {
  const [categories,setCategories] = useState<CategoryModel[]>([]);
  const [clients,setClients] = useState<ClientModel[]>([]);
  const [projects,setProjects] = useState<ProjectModel[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
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
  const handleStartPick: DatePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString)
  };
  const handleEndPick: DatePickerProps['onChange'] = (date, dateString) => {
    setEndDate(dateString)
  };
  const handleSearchCall = () =>
  {
    getFilteredTimeSheets(startDate,endDate,categoryId,projectId,clientId).then(data => setTimeSheets(data))
  }
  const handleReset = () =>
  {
    setcategoryId("");
  }
  return (
    <div>
        <h2>Reports</h2>
        <hr></hr>
        <div className='inputgroup'>
          <div className='margins'>
            <Select className='select margins' placeholder='Select Member' style={{ width: 300 }}>
            <Option value="jack">Jack</Option>
            </Select>
            <Select onClick={getProjectsHandler} className='select margins' placeholder='Select Project' style={{ width: 300 }} onChange={(e : string) => setprojectId(e)}>
            {projects.map((project) =>
            <Option key={project.id} value={project.id}>{project.projectName}</Option>
            )}
            </Select>
            <Select onClick={getCategoriesHandler} className='select margins' placeholder='Select Category' style={{ width: 300 }} onChange={(e: string) => setcategoryId(e)}>
            {categories.map((category) =>
            <Option key={category.id} value={category.id}>{category.name}</Option>
            )}
            </Select >
          </div>
          <div className='margins' style={{marginTop:'30px'}}>
            <Select onClick={getClientsHandler} className='select margins' placeholder='Select Client' style={{ width: 300 }} onChange={(e: string) => setclientId(e)}>
            {clients.map((client) =>
            <Option key={client.id} value={client.id}>{client.clientName}</Option>
            )}
            </Select>
            <Space direction="vertical">
            <DatePicker className='margins'  style={{ width: 300 }} placeholder='Start Date' onChange={handleStartPick}/>
            </Space>
            <Space direction="vertical">
            <DatePicker  className='margins' style={{ width: 300 }} placeholder='End Date' onChange={handleEndPick}/>
            </Space>
          </div>
          <div className='button-group'>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearchCall}>
                Search
              </Button>
              <Button type="primary" danger className='leftm' onClick={handleReset}>
                Reset
              </Button>
          </div>
        </div>
    </div>
  )
}

export default SearchHeader