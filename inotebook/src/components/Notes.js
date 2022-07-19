import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import NoteContext from '../context/NoteContext';
import AddNote from './AddNote';
import {useNavigate} from 'react-router-dom';

export default function Notes(props) {
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:"default"});
    const context = useContext(NoteContext);
    const { notes, getAllNote,editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token'))
            getAllNote();
        else
            navigate('/login');
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag});
        props.showalert("Note has been updated","success");
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }
    const handleClick = (e) =>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        
    }

    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <AddNote showalert={props.showalert}/>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: "none" }}>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit This Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input name="etitle" type="text" className="form-control" id="etitle" placeholder="Enter your title" onChange={onChange} value={note.etitle}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea value={note.edescription} name="edescription" className="form-control" id="edescription" rows="5" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input name="etag" type="text" className="form-control" id="etag" placeholder="Enter suitable tag" onChange={onChange} value={note.etag}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<15} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1 className='text-center my-3'>Your Notes</h1>
                {notes.length == 0 ? "There is no note present":
                notes.map((note) => {
                    return (
                        <NoteItem key={note._id} note={note} updateNote={updateNote} showalert={props.showalert} />
                    )
                })}
            </div>
        </>
    )
}
