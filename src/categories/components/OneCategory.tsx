import React from 'react'
import { CloseButton, ListGroup } from 'react-bootstrap'
import { deleteCategory } from '../category-service/category.service'
import { CategoryModel } from '../model/CategoryModel'
type CategoryProps =
{
    category:{
    id:string | undefined,
    name:string
    },
    handleShow : () => void,
    childToParent : (category:CategoryModel) => void,
    setcategoryDeleted:(isDeleted:boolean) => void
}
const OneCategory = ({category,childToParent,setcategoryDeleted}:CategoryProps) => {
  const deleteHandler = (Id:string | undefined) =>
    {
        deleteCategory(Id);
        setcategoryDeleted(true);
        
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