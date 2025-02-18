// import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Photobooth from './Components/Photobooth';

import './App.css'
import { useState } from 'react';

function App() {

  const [activeComponent, setActiveComponent] = useState('home')

  const handleActiveComponent = (component:string) => setActiveComponent(component)

  return (
    <>
   {activeComponent === 'home' && <Home onChangeView = {handleActiveComponent} />}
   {activeComponent === 'photobooth' && <Photobooth />}
   <Navbar onChangeView = {handleActiveComponent} />
   </>
  )
}

export default App
