import React,{useContext} from 'react'
import NoteContext from '../context/NoteContext';

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <>
            <div className="container col-md-3 my-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title">{props.note.title}</h5>
                            <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(props.note._id);props.showalert("Note has been deleted","success");}}></i>
                            <i className="fa-solid fa-pen-to-square" onClick={()=>props.updateNote(props.note)}></i>
                        </div>
                        <p className="card-text">{props.note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
