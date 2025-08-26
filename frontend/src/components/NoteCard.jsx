import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from 'react'
import { Link } from "react-router"; // Importing Link from react-router-dom for navigation
import { formatDate } from '../lib/utils';
// Importing Link from react-router-dom for navigation
import api from "../lib/axios"; // Importing the axios instance created in the lib directory for making API requests
import toast from "react-hot-toast";



const NoteCard = ({note,setNotes}) => {
    const handleDelete=async(e,id)=>{
    e.preventDefault(); // Prevent the default form submission behavior //it wont navigate when clicking delete button

    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
        await api.delete(`/notes/${id}`);
        // Making a DELETE request to the API endpoint to delete the note with the specified id
        setNotes((prev)=>prev.filter((note)=>note._id!==id)); //get rid of the dleted note 
        toast.success("Note deleted successfully");
        // Displaying a success toast notification after the note is deleted successfully
        
    } catch (error) {
        console.log("Error in handleDelete", error);
        toast.error("Failed to delete note");
    }


    }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3"> {note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                 <span className="text-sm text-base-content/60">
                {formatDate (new Date(note.createdAt))}
                 </span>
                 <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e)=>handleDelete(e,note._id)}>
                     <Trash2Icon className="size-4"/>    
                    </button>  
                 </div>
            </div>
        </div>

    </Link>
)
};

export default NoteCard