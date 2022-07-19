import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/NoteState';

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message,type) => {
    setalert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar></Navbar>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showalert={showalert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showalert={showalert}/>} />
              <Route path="/signup" element={<Signup showalert={showalert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
