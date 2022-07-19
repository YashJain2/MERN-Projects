import React from 'react'
import { useState } from 'react'


export default function TextForm(props) {
    const [text,setText] = useState("Enter Your Text");
    const handleOnChange = (e) =>{
        setText(e.target.value);
    };
    const handleUCClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Text Converted to UpperCase","success");
    };
    const handleLCClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Text Converted to LowerCase","success");
    };
    const handleClearClick = () => {
        setText("");
        props.showAlert("Text Cleared","success");
    };
    const handleCopy = () => 
    {
        navigator.clipboard.writeText(text);
        props.showAlert("Text Copied to Clipboard","success");
    };
    const handleExtraSpaces = () => 
    {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra Spaces removed","success");
    }


    let textareaStyle = (props.mode === "dark")?{backgroundColor:"#343A40",color:"white"}:{backgroundColor:"#fff",color:"black"}
    {

    }
    return (
    <>   
        <div className="form-group my-3 container">
            <h1>{props.heading}</h1>
            <textarea className="form-control" value = {text} onChange = {handleOnChange} id="myBox" rows="7" style={textareaStyle}></textarea>
            <button disabled={text.length === 0} className="btn btn-primary my-3" onClick={handleUCClick}>Convert to UpperCase</button>
            <button disabled={text.length === 0} className="btn btn-primary m-3" onClick={handleLCClick}>Convert to LowerCase</button>
            <button disabled={text.length === 0} className="btn btn-primary m-3" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length === 0} className="btn btn-primary m-3" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length === 0} className="btn btn-primary m-3" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        </div>
        <div className="container my-3">
            <p> {text.split(/\s+/).filter((e)=>{return(e.length!==0)}).length} words</p>
            <p> {text.length} characters</p>
            <p>{text.length === 0 ? 0 : 0.01 * text.split(" ").length} Minutes read</p>
            <h3>Preview</h3>
            <p>{text.length == 0?"Enter Something to Preview":text}</p>
        </div>
    </>
  )
}