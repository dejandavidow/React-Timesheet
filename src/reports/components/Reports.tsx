
import Column from 'antd/lib/table/Column'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { TsModel } from '../../timesheet/model/TsModel'
import { getFilteredTimeSheets} from '../../timesheet/service/timesheet-service'
import SearchHeader from './SearchHeader'


const Reports = () => {
  const [timesheets,setTimeSheets] = useState<TsModel[]>([])
  const [categoryId,setcategoryId] = useState("");
  const [clientId,setclientId] = useState("");
  const [projectId,setprojectId] = useState("");
  const [startDate,setStartDate] =useState("");
  const [endDate,setEndDate] =useState("");
  useEffect(() => {
   getFilteredTimeSheets(startDate,endDate,categoryId,projectId,clientId).then(data => setTimeSheets(data))
  }, [timesheets.length])
  return (
    <>
    <div className="container bgcolor">
    <SearchHeader
    setclientId={setclientId}
    setprojectId={setprojectId}
    setcategoryId={setcategoryId}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    startDate={startDate}
    endDate={endDate}
    categoryId={categoryId}
    clientId={clientId}
    projectId={projectId}
    setTimeSheets={setTimeSheets}
    />
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Team Member</th>
          <th>Project</th>
          <th>Category</th>
          <th>Description</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {timesheets.map((ts) =>
        <tr key={ts.id}>
        <td>{ts.date.slice(0,10)}</td>
        <td>id</td>
        <td>{ts.projectId}</td>
        <td>@{ts.categoryId}</td>
        <td>{ts.description}</td>
        <td>{ts.time}</td>
      </tr>
        )}
      </tbody>
    </Table>
    {/* <Table dataSource={timesheets} pagination={false}>
      <Column title='Date' dataIndex='date'/>
      <Column title='Member' dataIndex='memberId'/>
      <Column title='Project' dataIndex='projectId'/>
      <Column title='Category' dataIndex='clientId'/>
      <Column title='Description' dataIndex='description'/>
      <Column title='Time' dataIndex='time'/>
    </Table> */}
    </div>

    </>
  )         
}

export default Reports