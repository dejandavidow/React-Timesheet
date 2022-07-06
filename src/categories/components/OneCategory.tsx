import React, { useState } from 'react'
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
type error =
{
  code:number
  msg:string
}
const OneCategory = ({category,childToParent,setcategoryDeleted,setIsLoaded}:CategoryProps) => {
  const [error,setError] = useState<string | null>("")
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
          },(err) => setError(err))
    }
  return (
    <div>
      <>
      {error ? message.warn(error) : null}
    <ListGroup.Item key={category.id} className="listhover"><button onClick={() => childToParent(category)} className="btnlist">{category.name}</button><CloseButton onClick={() => deleteHandler(category.id)} className="xdugme"/></ListGroup.Item>
    </>
    </div>
  )
}

export default OneCategory