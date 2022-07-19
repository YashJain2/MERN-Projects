import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About'
import {
  Routes,
  Route,
} from "react-router-dom";



function App() {
  const [mode,setMode] = useState("light"); 
  const [modeTxt,setModetxt] = useState("Dark");  
  const [alert, setalert] = useState(null);

  const showAlert = (message,type) => {
    setalert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1000);
  };

  const toggleMode = (e) =>{
    setMode((mode === "dark")? "light": "dark");
    if(mode === "dark")
    {
      // console.log(e.target.nextSibling);
      document.body.style.color = "black";
      document.body.style.backgroundColor = "white";
      e.target.nextSibling.style.color = "#343A40";
      setModetxt("Dark");
      showAlert("Light Mode Enabled","success");
      // document.title = "TextUtils - Light Mode";
    }
    else
    {
      e.target.nextSibling.style.color = "white";
      document.body.style.color = "white";
      document.body.style.backgroundColor = "black";
      setModetxt("Light");
      showAlert("Dark Mode Enabled","success");
      // document.title = "TextUtils - Dark Mode";
    }
  }
  return (
    <>
      <Navbar  navTitle = "Text Utils" mode = {mode} toggleMode={toggleMode} modeTxt={modeTxt}/>
      <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element= {<TextForm heading = "Try TextUtils - Word Counter, Character Counter, Extra space Remover, UpperCase & LowerCase Converter" showAlert={showAlert} mode={mode}/>} />
            
          <Route exact path="/about" element={<About/>} />
            
        </Routes>
    </>
  );
}

export default App;
