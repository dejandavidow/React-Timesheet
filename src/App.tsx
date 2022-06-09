import {Route, Routes} from 'react-router-dom';
import './App.css'
import Category from './categories/components/Category';
import Client from './clients/components/Client';
import Header from './Header';
import Member from './members/components/Member';
import Project from './projects/componets/Project';
import TimeSheet from './timesheet/components/TimeSheet';
function App() {
  return (
    <>
    <Header/>
      <Routes>
      <Route path="timesheets" element={<TimeSheet/>}/>
        <Route path="clients" element={ <Client/> } />
        <Route path="categories" element={ <Category/> } />
        <Route path="members" element={ <Member/> } />
        <Route path="projects" element={ <Project/> } />
      </Routes>  
    </>
  )
}


export default App;
