// import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Photobooth from './Components/Photobooth';

import './App.css'
import { useState } from 'react';

function App() {

  const [activeComponent, setActiveComponent] = useState('home')
  const [stopTimer, setStopTimer] = useState(true)

  const handleActiveComponent = (component:string) => setActiveComponent(component)

  const handleStopTimer = (decision:boolean) => {
    setStopTimer(decision)
  }

  return (
    <>
   {activeComponent === 'home' && <Home onChangeView = {handleActiveComponent} handleStopTimer = {handleStopTimer} />}
   {activeComponent === 'photobooth' && <Photobooth stopTimer = {stopTimer} handleStopTimer = {handleStopTimer} />}
   <Navbar onChangeView = {handleActiveComponent} />
   </>
  )
}

export default App
