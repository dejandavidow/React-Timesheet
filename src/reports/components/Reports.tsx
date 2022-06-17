import type { PaginationProps } from 'antd';
import Column from 'antd/lib/table/Column'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { TsModel } from '../../timesheet/model/TsModel'
import { getFilteredTimeSheets, getPageCount} from '../../timesheet/service/timesheet-service'
import SearchHeader from './SearchHeader'


const Reports = () => {
  const [timesheets,setTimeSheets] = useState<TsModel[]>([])
  const [categoryId,setcategoryId] = useState("");
  const [clientId,setclientId] = useState("");
  const [projectId,setprojectId] = useState("");
  const [startDate,setStartDate] =useState("");
  const [endDate,setEndDate] =useState("");
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [pageCount,setpageCount] = useState<number>(0)
  const [reFetch,setreFetch] = useState(false);
  useEffect(() => {
   getFilteredTimeSheets(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize).then(data => setTimeSheets(data));
   getPageCount(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize).then(data => setpageCount(data));
  }, [pageNumber,pageCount,reFetch])
  const onChange: PaginationProps['onChange'] = pageNumber => {
    setPageNumber(pageNumber);
  };
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
    pageNumber={pageNumber}
    pageSize={pageSize}
    setpageCount={setpageCount}
    setreFetch={setreFetch}
    />
    <Table dataSource={timesheets} pagination={{position:['bottomCenter'],onChange:onChange,total:pageCount,pageSize:pageSize}}>
      <Column title='Date' dataIndex='date' key='date'/>
      <Column title='Member' dataIndex='memberId' key='memberId'/>
      <Column title='Project' dataIndex='projectId' key='projectId'/>
      <Column title='Category' dataIndex='clientId' key='clientId'/>
      <Column title='Description' dataIndex='description' key='description'/>
      <Column title='Time' dataIndex='time' key='time'/>
    </Table>
    <div className="container totalhours">
        <p>
          Total Hours:<span style={{ color: "darkorange" }}>{0}</span>
        </p>
      </div>
    </div>

    </>
  )         
}

export default Reports