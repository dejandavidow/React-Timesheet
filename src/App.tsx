import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminComponent from './AdminComponent';
import './App.css'
import LoginPage from './Auth/components/LoginPage';
import ProtectedRoute from './Auth/components/ProtectedRoute';
import Category from './categories/components/Category';
import Client from './clients/components/Client';
import Member from './members/components/Member';
import PasswordReset from './members/Reset-Password/PasswordReset';
import Project from './projects/componets/Project';
import Reports from './reports/components/Reports';
import TimeSheet from './timesheet/components/TimeSheet';
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/timesheets" element={ 
          <ProtectedRoute>
              <TimeSheet/>
          </ProtectedRoute>
        }/>
        <Route path="/categories" element={
              <ProtectedRoute>
              <Category/>
            </ProtectedRoute>
        }/>
        <Route path="/clients" element={
              <ProtectedRoute>
              <Client/>
            </ProtectedRoute>
        }/>
        <Route path="/projects" element={
                  <ProtectedRoute>
                  <Project/>
                </ProtectedRoute>
        }/>
        <Route path="/members" element={
                <ProtectedRoute>
                <Member/>
              </ProtectedRoute>
        }/>
        <Route path="/reports" element={
              <ProtectedRoute>
              <Reports/>
            </ProtectedRoute>
        }/>
        <Route path="/admin" element={
              <ProtectedRoute>
             <AdminComponent/>
            </ProtectedRoute>
        }/>
      </Routes>
      </BrowserRouter>
  )
}


export default App;
