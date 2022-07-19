import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const [credentials, setcredentials] = useState({
    name:"",
    email: "",
    password: "",
    cpassword:""
  })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3003/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success) {
      //redirect to his notes
      // console.log(json);
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showalert("You have successfully registered to I-NoteBook","success");
    }
    else {
      //alert
      // console.log(json);
      props.showalert(json.error,"danger");
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <h2 className='text-center my-3'>New User - Create Your Own Notes On Cloud</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="signupname" className="form-label">Name</label>
          <input type="text" className="form-control" id="signupname" name='name' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="signupemail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="signupemail" aria-describedby="emailHelp" name='email' onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="signuppass" className="form-label">Password</label>
          <input type="password" className="form-control" id="signuppass" name='password' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="signupcpass" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="signupcpass" name='cpassword' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
