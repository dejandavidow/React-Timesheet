import React, { useState } from "react";
import Header from "../../Header";
import CategoryHeader from "./CategoryHeader";
import CategoryList from "./CategoryList";

const Category = () => {
  const [newCategoryCreated, setNewCategoryCreated] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryDeleted, setcategoryDeleted] = useState<boolean>(false);
  const [categoryUpdated, setcategoryUpdated] = useState<boolean>(false);
  const [letter, setLetter] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Header />
      <div className="container bgcolor">
        <CategoryHeader
          setNewCategoryCreated={setNewCategoryCreated}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setLetter={setLetter}
          setIsLoaded={setIsLoaded}
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
          setIsLoaded={setIsLoaded}
          isLoaded={isLoaded}
        />
      </div>
    </>
  );
};

export default Category;
