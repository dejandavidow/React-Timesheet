import React, { useState } from 'react'
import CategoryHeader from './CategoryHeader'
import CategoryList from './CategoryList'

const Category = () => {
  const [newCategoryCreated, setNewCategoryCreated] = useState<boolean>(false);
  const [searchTerm,setSearchTerm] = useState("");
  const [categoryDeleted,setcategoryDeleted] = useState<boolean>(false);
  const [categoryUpdated,setcategoryUpdated] = useState<boolean>(false);
  const [letter,setLetter] = useState("");
  return (
    <div className='container bgcolor'>
    <CategoryHeader
         setNewCategoryCreated={setNewCategoryCreated}
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         setLetter={setLetter}
    />
    <CategoryList
    setNewCategoryCreated={setNewCategoryCreated} 
    newcategoryCreated={newCategoryCreated}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    categoryDeleted={categoryDeleted}
    setcategoryDeleted={setcategoryDeleted}
    setcategoryUpdated={setcategoryUpdated}
    categoryUpdated={categoryUpdated}
    letter={letter}
    setLetter={setLetter}
    />
    </div>
  )
}

export default Category