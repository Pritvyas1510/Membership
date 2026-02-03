import React from 'react'
import Login from './Page/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './Page/Home/Home'
import AdminNavbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Events from './Page/Events/Events'
import EventHome from './Page/Events/EventHome'
import EventUpdate from './Page/Events/EventUpdate'

const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" />
    <AdminNavbar/>
    <Routes>
      <Route path='/' element={ <Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/eventhome' element={<EventHome/>}/>
      <Route path='/eventupdate/:id' element={<EventUpdate/>}/>
      <Route path='/event' element={<Events/>}/>
    </Routes>
</div>
  )
}

export default App