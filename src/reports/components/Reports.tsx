import React from 'react'
import { Table } from 'react-bootstrap'
import SearchHeader from './SearchHeader'

const Reports = () => {
  return (
    <>
    <div className="container bgcolor">
    <SearchHeader/>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Team Member</th>
          <th>Project</th>
          <th>Category</th>
          <th>Description</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default Reports