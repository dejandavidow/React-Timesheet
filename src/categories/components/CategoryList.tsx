import { message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { countCategory, getCategories, UpdateCategory } from '../category-service/category.service'
import { CategoryModel } from '../model/CategoryModel'
import OneCategory from './OneCategory'
type CategoryListProps = {
  newcategoryCreated: boolean,
  searchTerm:string,
  setNewCategoryCreated: (isCreated: boolean) => void,
  categoryDeleted:boolean,
  setcategoryDeleted:(isDeleted: boolean) => void
  categoryUpdated:boolean,
  setcategoryUpdated:(isUpdated: boolean) => void,
  setSearchTerm:(c:string) => void,
  letter: string,
  setLetter: (l:string) => void
  setIsLoaded:(c:boolean) => void
  isLoaded:boolean
}
const CategoryList = (props:CategoryListProps) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [childClient,setChildClient] = useState<CategoryModel>(new CategoryModel('', ''));
  const [pageCount,setpageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  useEffect(() => {
    getCategories(props.searchTerm, props.letter, pageNumber,pageSize).then(
      data => {
        props.setIsLoaded(true)
        setCategories(data)
    },
    (error) =>
    {
      props.setIsLoaded(true)
      setError(error)
    }
      );
    countCategory(props.searchTerm, props.letter).then(data => setpageCount(Math.ceil(data/pageSize)));
    props.setNewCategoryCreated(false);
    props.setcategoryDeleted(false);
    props.setcategoryUpdated(false);
}, [props.newcategoryCreated, props.searchTerm,props.categoryDeleted,props.categoryUpdated,pageNumber,pageCount, props.letter,categories.length])
const handlePageClick = (e:{selected: number}) =>
{
setPageNumber(e.selected+1);
}

const childToParent = (category:CategoryModel) => 
{
   setChildClient(category);
   handleShow();
}
const updatecategoryHandler = () =>
{
     setChildClient(childClient);
      UpdateCategory(childClient,childClient.id).then(e =>
        {
          props.setcategoryUpdated(true);
          handleClose();
          message.success("Category updated successfully")
        }
        )
}
const handleChange = (evt : React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) =>
{
  const value = evt.target?.value;
  setChildClient({
    ...childClient,
    [evt.target.name]: value
  });
}
const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) =>
{
  props.setSearchTerm('')
  const button: HTMLButtonElement = event.currentTarget;
  props.setLetter(button.value);
}
if(!props.isLoaded)
{
  return <Spin tip="Loading..." style={{margin:"5vh 60vh"}}/>
}
else if(error)
{
return <div>error {}</div>
}
else{
  return (
    <>
    <div className="container">
    <div className="filteri">
      <button type="button" onClick={handleFilter} value="a" className="filter-buttons">A</button>
      <button type="button" onClick={handleFilter} value="b" className="filter-buttons">B</button>
      <button type="button" onClick={handleFilter} value="c" className="filter-buttons">C</button>
      <button type="button" onClick={handleFilter} value="d" className="filter-buttons">D</button>
      <button type="button" onClick={handleFilter} value="e" className="filter-buttons">E</button>
      <button type="button" onClick={handleFilter} value="f" className="filter-buttons">F</button>
      <button type="button" onClick={handleFilter} value="g" className="filter-buttons">G</button>
      <button type="button" onClick={handleFilter} value="h" className="filter-buttons">H</button>
      <button type="button" onClick={handleFilter} value="i" className="filter-buttons">I</button>
      <button type="button" onClick={handleFilter} value="j" className="filter-buttons">J</button>
      <button type="button" onClick={handleFilter} value="k" className="filter-buttons">K</button>
      <button type="button" onClick={handleFilter} value="l" className="filter-buttons">L</button>
      <button type="button" onClick={handleFilter} value="m" className="filter-buttons">M</button>
      <button type="button" onClick={handleFilter} value="n" className="filter-buttons">N</button>
      <button type="button" onClick={handleFilter} value="o" className="filter-buttons">O</button>
      <button type="button" onClick={handleFilter} value="p" className="filter-buttons">P</button>
      <button type="button" onClick={handleFilter} value="q" className="filter-buttons">Q</button>
      <button type="button" onClick={handleFilter} value="r" className="filter-buttons">R</button>
      <button type="button" onClick={handleFilter} value="s" className="filter-buttons">S</button>
      <button type="button" onClick={handleFilter} value="t" className="filter-buttons">T</button>
      <button type="button" onClick={handleFilter} value="u" className="filter-buttons">U</button>
      <button type="button" onClick={handleFilter} value="v" className="filter-buttons">V</button>
      <button type="button" onClick={handleFilter} value="w" className="filter-buttons">W</button>
      <button type="button" onClick={handleFilter} value="x" className="filter-buttons">X</button>
      <button type="button" onClick={handleFilter} value="y" className="filter-buttons">Y</button>
      <button type="button" onClick={handleFilter} value="z" className="filter-buttons">Z</button>
      
    </div>
    <ListGroup className='listgroup'>
    {categories.map((category) =>
    <OneCategory
    key={category.id} 
    category={category}
    handleShow={handleShow}
    childToParent={childToParent}
    setcategoryDeleted={props.setcategoryDeleted}
    setIsLoaded={props.setIsLoaded}
    />
    )}
    </ListGroup> 
    <ReactPaginate
       breakLabel="..."
       nextLabel="next>"
       onPageChange={handlePageClick}
       pageRangeDisplayed={pageSize}
       pageCount={pageCount}
       previousLabel="<previous"
       className="pagination"
       //renderOnZeroPageCount={null}
    />

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>Update category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={childClient?.name} name="name" onChange={handleChange}/>
          </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="warning"  onClick={updatecategoryHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
    </>
  )
}
}

export default CategoryList