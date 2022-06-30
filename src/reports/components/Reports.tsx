
import React, { useEffect, useState } from 'react'
import { getFilteredTimeSheets, getPageCount, onLoadFilteredTimeSheets} from '../../timesheet/service/timesheet-service'
import SearchHeader from './SearchHeader'
import Header from '../../Header';
import { ReportModel } from '../../timesheet/model/ReportModel';
import { PaginationProps, Table } from 'antd';
import type { ColumnsType} from 'antd/lib/table';
const Reports = () => {
  const [timesheets,setTimeSheets] = useState<ReportModel[]>([])
  const [categoryId,setcategoryId] = useState("");
  const [clientId,setclientId] = useState("");
  const [projectId,setprojectId] = useState("");
  const [memberId,setmemberId] = useState("");
  const [startDate,setStartDate] =useState("");
  const [endDate,setEndDate] =useState("");
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [pageCount,setpageCount] = useState<number>(0)
  const [reFetch,setreFetch] = useState(false);
  const [totalHours,setTotalHours] = useState(0)
  useEffect(() => {
   onLoadFilteredTimeSheets(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize).then(data => setTimeSheets(data));
   getPageCount(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize).then(data => setpageCount(data));
   totalTimeHandler()  
  }, [pageNumber,pageCount,reFetch,timesheets.length])
  const onChange: PaginationProps['onChange'] = pageNumber => {
    setPageNumber(pageNumber);
  };
  const columns : ColumnsType<ReportModel> = [
    {
      title: 'Date',
      dataIndex:'date',
      key: 'date',
    },
    {
      title: 'Team Member',
      dataIndex:["projectDTO", "memberDTO","name"],
      key: 'memberDTO',
    },
    {
      title: 'Projects',
      dataIndex:["projectDTO","projectName"],
      key: 'projectDTO',
    },
    {
      title: 'Category',
      dataIndex: ["categoryDTO", "name"],
      key: 'categoryDTO'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hours',
      dataIndex: 'time',
      key: 'time',
    }
  ];
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
      setTotalHours(sum)
    }
  return (
    <>
    <Header/>
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
    setmemberId={setmemberId}
    />
    <Table dataSource={timesheets} columns={columns} pagination={{position:['bottomCenter'],onChange:onChange,total:pageCount,pageSize:pageSize}}/>
    <div className="container totalhours">
        <p>
          Reports Total:<span style={{ color: "darkorange" }}>{totalHours}</span>
          {}
        </p>
      </div>
    </div>

    </>
  )         
}

export default Reports