import React from 'react';
import propTypes from 'prop-types';
import {
    Link
  } from "react-router-dom";
  

export default function Navbar(props) {
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <Link className="navbar-brand" to="/">{props.navTitle}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}      

<div className="custom-control custom-checkbox">
<input type="checkbox" className="custom-control-input" id="customCheck1" onClick = {(e) => props.toggleMode(e)}/>
<label className="custom-control-label" htmlFor="customCheck1" style={{color:"black"}}>Enable {props.modeTxt} Mode</label>
</div>
                </div>
            </nav>
        </>
    );
}



Navbar.propTypes = 
{
    navTitle: propTypes.string,
    mode: propTypes.string.isRequired
    // navTitle: propTypes.string.isRequired
}

Navbar.defaultProps = {
    navTitle: "Set Title",
    mode:"light"
}