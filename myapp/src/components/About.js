import React from 'react'
import { useState } from 'react'

export default function About() {
    const[myState,setMyState] = useState({
        color: "black",
        backgroundColor: "white"
    });

    // const [btntext,setBtntext] = useState("Enable Dark Mode");

    // const toggleState = () => {
    //     if(myState.color === "black")
    //     {
    //         setMyState({
    //             color: "white",
    //             backgroundColor: "black"
    //         });
    //         setBtntext("Enable Light Mode");
    //     }
    //     else
    //     {
    //         setMyState({
    //             color: "black",
    //             backgroundColor: "white"
    //         });
    //         setBtntext("Enable Dark Mode");
    //     }
    // }

  return (
    <>
    <div className='container my-3' style={myState}>
        <p style={myState}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
        </p>
        {/* <button className="btn btn-primary" onClick={toggleState}>{btntext}</button> */}
    </div>
    </>
  )
}
