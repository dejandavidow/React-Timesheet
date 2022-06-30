import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { PostCategory } from '../category-service/category.service';
import { CategoryModel } from '../model/CategoryModel';
type CategoryHeaderProps = {
  setNewCategoryCreated: (isCreated: boolean) => void,
  searchTerm:string,
  setSearchTerm:(src:string) => void,
  setLetter:(l:string) => void
}

const CategoryHeader = ({setNewCategoryCreated,searchTerm,setSearchTerm,setLetter}:CategoryHeaderProps) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name,setName] = useState("");
  const showModal = () => {
    setVisible(true);
  }

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const CreateCategoryHandler = () =>
  {
    PostCategory({id:undefined,name})
    setConfirmLoading(true)
    setTimeout(() =>
    {
      setNewCategoryCreated(true)
      setVisible(false)
      setConfirmLoading(false)
    },1000)
    form.resetFields()
  }
  return (
    <div>
         <>
      <h2>Categories</h2>
      <hr></hr>
      <Modal
        title="Create New Category"
        visible={visible}
        confirmLoading={confirmLoading}
        footer={false}
        keyboard={true}
        closable={false}
      >
       <Form onFinish={CreateCategoryHandler} form={form} autoComplete='off'>
       <Form.Item name={"Name"} label="Category Name" rules={[{ required: true,min:3 }]}>
        <Input onChange={(value) => setName(value.target.value)} value={name}/>
      </Form.Item>
      <Button htmlType='submit' type='primary'>Create</Button>
      <Button onClick={handleCancel} style={{marginLeft:"1vh"}}>Cancel</Button>
       </Form>
      </Modal>
    <div className='pozadina'>
    <button className='dugme' onClick={showModal}>Create new Category</button>
    <input type='search' className='searchinput' placeholder='Search' value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value);setLetter('')}}></input>
    </div>
    </>
    </div>
  )
}

export default CategoryHeader