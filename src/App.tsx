import {Route, Routes} from 'react-router-dom';
import './App.css'
import Category from './categories/components/Category';
import Client from './clients/components/Client';
import Header from './Header';
function App() {
  return (
    <>
     <Header/>
     <Routes>
        <Route path="clients" element={ <Client/> } />
        <Route path="categories" element={ <Category/> } />
      </Routes>  
    </>
  )
}


export default App;
