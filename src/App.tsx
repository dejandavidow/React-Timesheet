
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import LoginPage from './Auth/components/LoginPage';
import ProtectedRoute from './Auth/components/ProtectedRoute';
import Category from './categories/components/Category';
import Client from './clients/components/Client';
import Header from './Header';
import Member from './members/components/Member';
import Project from './projects/componets/Project';
import Reports from './reports/components/Reports';
import TimeSheet from './timesheet/components/TimeSheet';
function App() {
  return (
    <>
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
                <ProtectedRoute >
                <Member/>
              </ProtectedRoute>
        }/>
        <Route path="/reports" element={
              <ProtectedRoute>
              <Reports/>
            </ProtectedRoute>
        }/>
      </Routes>
      </>
  )
}


export default App;
