import React from 'react'
import { CloseButton, ListGroup } from 'react-bootstrap'
import { deleteCategory } from '../category-service/category.service'
import { CategoryModel } from '../model/CategoryModel'
import {message } from 'antd';
type CategoryProps =
{
    category:{
    id:string | undefined,
    name:string
    },
    handleShow : () => void,
    childToParent : (category:CategoryModel) => void,
    setcategoryDeleted:(isDeleted:boolean) => void
    setIsLoaded:(c:boolean) => void
}
const OneCategory = ({category,childToParent,setcategoryDeleted,setIsLoaded}:CategoryProps) => {
  const deleteHandler = (Id:string | undefined) =>
    {
        deleteCategory(Id).then(e =>
          {
            if(!e)
            {
              setIsLoaded(false)
            }
              setcategoryDeleted(true)
              message.success("Category deleted successfully")
          },err => console.log(err)
          )
    }
  return (
    <div>
      <>
    <ListGroup.Item key={category.id} className="listhover"><button onClick={() => childToParent(category)} className="btnlist">{category.name}</button><CloseButton onClick={() => deleteHandler(category.id)} className="xdugme"/></ListGroup.Item>
    </>
    </div>
  )
}

export default OneCategory