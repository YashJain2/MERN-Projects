import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
// import LoadingBar from 'react-top-loading-bar'
import {
  Routes,
  Route,
} from "react-router-dom";
// import { useState } from 'react';

export default function App (){
    // const [progress,setProgress] = useState(0);
    let apiKey = "f22d3ef87f3e464fbeb9303126908922";
    console.log(process.env.REACT_APP_NEWS_API_KEY);
    return (
      <>
        <Navbar heading="News Mail"/>
        {/* <LoadingBar
        color='#f11946'
        progress={progress}
        /> */}
        <Routes>
              <Route  path ="/" element={<News key="home" pageSize = {10} country={"in"} category={"general"} apiKey={apiKey}/>} />
              <Route  path ="/business" element={<News key="buisness" pageSize = {6} country={"in"} category={"business"} apiKey={apiKey}/>} /> 
              <Route  path ="/entertainment" element={<News key="entertainment" pageSize = {6} country={"in"} category={"entertainment"} apiKey={apiKey}/>} />
              <Route  path ="/general" element={<News key="general" pageSize = {6} country={"in"} category={"general"} apiKey={apiKey}/>} />
              <Route  path ="/health" element={<News key="health" pageSize = {6} country={"in"} category={"health"} apiKey={apiKey}/>} />
              <Route  path ="/science" element={<News key="science" pageSize = {6} country={"in"} category={"science"} apiKey={apiKey}/>} />
              <Route  path ="/technology" element={<News key="technology" pageSize = {6} country={"in"} category={"technology"} apiKey={apiKey}/>} />
              <Route  path ="/sports" element={<News key="sports" pageSize = {6} country={"in"} category={"sports"} apiKey={apiKey}/>} /> */
        </Routes>
        </>
      
    )
  }


//API key : 59816414d8ba443daa45cb1bc5df7ef4
//URL: https://newsapi.org/v2/top-headlines?country=id&apiKey=59816414d8ba443daa45cb1bc5df7ef4
