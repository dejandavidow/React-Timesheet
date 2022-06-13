import { Select } from 'antd'
import '../style.css'
import React from 'react'
const { Option } = Select;
const SearchHeader = () => {
  return (
    <div>
        <h2>Reports</h2>
        <hr></hr>
        <div className='inputgroup'>
          <div className='margins'>
            <Select className='select margins' placeholder='Select Member' style={{ width: 300 }}>
            <Option value="jack">Jack</Option>
            </Select>
            <Select className='select margins' placeholder='Select Project' style={{ width: 300 }}>
            <Option value="jack">Jack</Option>
            </Select>
            <Select className='select margins' placeholder='Select Category' style={{ width: 300 }}>
            <Option value="jack">Jack</Option>
            </Select >
          </div>
          <div className='margins' style={{marginTop:'30px'}}>
            <Select className='select margins' placeholder='Select Client' style={{ width: 300 }}>
            </Select >
            <Select className='select margins' placeholder='Start date' style={{ width: 300 }}>
            <Option value="jack">Jack</Option>
            </Select >
            <Select className='select margins' placeholder='End date' style={{ width: 300 }}>
            <Option value="jack">Jack</Option>
            </Select >
          </div>
        </div>
    </div>
  )
}

export default SearchHeader