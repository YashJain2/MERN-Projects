import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function login(props) {

    const [credentials, setcredentials] = useState({
        email:"",
        password:""
    })
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:3003/api/auth/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
        });
        const json = await response.json();
        if(json.success)
        {
            //redirect to his notes
            // console.log(json);
            localStorage.setItem('token',json.authToken);
            navigate("/");   
            props.showalert("You have Successfully Logged In","success");
        }
        else
        {
            //alert
            // alert("Wrong Credentials");
            props.showalert(json.error,"danger");
        }
    }

    const onChange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    return (
        <div className='container'>
            <h2 className='text-center my-3'>Login to I-NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="loginemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginemail" aria-describedby="emailHelp" name='email' onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginpass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginpass" name='password' onChange={onChange}/>
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
