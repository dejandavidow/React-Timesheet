
import React, { useEffect, useMemo, useState } from 'react'
import { getPageCount, onLoadFilteredTimeSheets} from '../../timesheet/service/timesheet-service'
import SearchHeader from './SearchHeader'
import Header from '../../Header';
import { ReportModel } from '../../timesheet/model/ReportModel';
import { PaginationProps, Spin, Table } from 'antd';
import type { ColumnsType} from 'antd/lib/table';

const Reports = React.memo(() => {
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
  const [isLoaded,setIsLoaded] = useState(false)
  const [error,setError] = useState<any>(null)
  const [searchCall,setCall] = useState(false)
  useEffect(() => {
    onLoadFilteredTimeSheets(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize,memberId).then(
     data => 
     {
       setIsLoaded(true)
       setTimeSheets(data)
       setTotalHours(totalTimeHandler(data))
     }
     ,(err) =>
     {
       setIsLoaded(true)
       setError(err)
     });
    }
   , [pageNumber,reFetch,searchCall])
   useEffect(() => {
    getPageCount(startDate,endDate,categoryId,projectId,clientId,pageNumber,pageSize,memberId).then(data =>{
      setpageCount(data)
   });
   
   }, [searchCall,reFetch])
   
   const totalTimeHandler =(tsar:ReportModel[]) =>{
    const timearray : number[]= []
    {tsar.map((ts) =>
      {
        return timearray.push(Number(ts.time))
      }
      )}
    var sum = timearray.reduce(function(a, b){
        return a + b;
    }, 0);
     return sum;
  }
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
    setIsLoaded={setIsLoaded}
    setError={setError}
    memberId={memberId}
    setCall={setCall}
    />
    { isLoaded ? <Table dataSource={timesheets} columns={columns} pagination={{position:['bottomCenter'],onChange:onChange,total:pageCount,pageSize:pageSize}}/> : <Spin tip="Loading..." style={{margin:"5vh 60vh"}}/>}
    {error ? <p>{error.message}</p> : null}
    <div className="container totalhours">
        <p>
          Reports Total:<span style={{ color: "darkorange" }}>{totalHours}</span>
          {}
        </p>
      </div>
    </div>

    </>
  )        
})

export default Reports