import React,{useContext,useState} from 'react'
import NoteContext from '../context/NoteContext';

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:"default"});
    }

    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }
    return (
        <>
            <div className='container my-3'>
                <h1 className='my-3'>Add A Note</h1>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input name="title" type="text" className="form-control" id="title" placeholder="Enter your title" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" className="form-control" id="description" rows="5" onChange={onChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input name="tag" type="text" className="form-control" id="tag" placeholder="Enter suitable tag" onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<15} type="submit" className='btn btn-primary my-3' onClick={handleClick}>Add </button>
                </form>
            </div>
        </>
    )
}
