import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Dashboard from './Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Checklists from './components/Checklists'
import Home from './components/Home'
import AddChecklist from './components/AddChecklist'
import AddTasks from './components/AddTasks'
import ToDoChecklist from './components/ToDoChecklist'
import Login from './components/Login'
import { AuthContextProvider } from './contexts/AuthContext'
import Admin from './components/Admin'
import ToDoChecklistUpdate from './components/ToDoChecklistUpdate'

function App() {
  return (
    <>
    <AuthContextProvider>

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/admin'} element={<Admin />} />
          <Route path={'/home'} element={<Home />} />
          <Route path={'/checklists'} element={<AddChecklist />} />
          <Route path={'/tasks'} element={<AddTasks />} />
          <Route path={'/todochecklist'} element={<ToDoChecklist />} />
          <Route path={'/todochecklistupdate'} element={<ToDoChecklistUpdate />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    </>
  )
}

export default App
