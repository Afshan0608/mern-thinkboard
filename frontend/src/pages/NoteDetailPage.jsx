import React from 'react'; // Importing React to use JSX syntax
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router'; // Importing hooks from
import { useEffect } from 'react'; // Importing useEffect hook from React for side effects
import api from '../lib/axios'; // Importing the axios instance created in the lib directory for making API requests
import toast from 'react-hot-toast'; // Importing toast from react-hot-toast for displaying notifications
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router'; // Importing Link from react-router-dom for navigation

const NoteDetailPage = () => {
  const [note, setNote]=useState(null); // State to hold the note details
  const [loading,setLoading]=useState(true); // State to manage loading state
  const [saving ,setSaving]=useState(false); // State to manage saving state

  const navigate=useNavigate();
  // useNavigate is a hook from react-router-dom that allows you to programmatically navigate to different routes in your application

  const {id}=useParams();
  // useParams is a hook from react-router-dom that allows you to access the parameters of the current route

      //console.log({id}); // Logging the id parameter to the console for debugging purposes
useEffect(()=>{
  const fetchNote=async()=>{
    try{
      const res=await api.get(`/notes/${id}`);
      // Making a GET request to the API endpoint to fetch the note with the specified id
      setNote(res.data); // Setting the fetched note data to the note state variable


    }catch(error){
      console.log("Error in fetching note",error);  // Logging an error message to the console if the fetch operation fails
      toast.error("Failed to fetch note"); // Displaying an error toast notification if the fetch operation fails

    }finally{
      setLoading(false); // Setting loading to false after the fetch operation is complete, regardless of success or failure
    }
    };
    fetchNote();
  // Calling the fetchNote function to fetch the note details when the component mounts

},[id]);

const handleDelete=async()=>{
 if(!window.confirm("Are you sure you want to delete this note?")) return;
  try{
    await api.delete(`/notes/${id}`);
    // Making a DELETE request to the API endpoint to delete the note with the specified id
    toast.success("Note deleted");
    // Displaying a success toast notification after the note is deleted successfully
    navigate("/"); // Navigating back to the home page after deleting the note
  }catch(error){
    console.log("Error deleting the note", error); // Logging an error message to the console if the delete operation fails
    toast.error("Failed to delete note"); // Displaying an error toast notification if the delete operation fails
  }
}
const handleSave=async()=>{
  if(!note.title.trim() || !note.content.trim()){
    toast.error("please add a title or content");
    return;
    
  }
  setSaving(true);
  try{
    await api.put(`/notes/${id}`,note);
    // Making a PUT request to the API endpoint to update the note with the specified id
    toast.success("Note updated successfully");
    // Displaying a success toast notification after the note is updated successfully
    navigate("/"); // Navigating back to the home page after updating the note
  }catch(error){
    console.log("Error saving the note:",error);
    toast.error("Failed to update note");


  }finally{
    setSaving(false);
  }
}

 
if(loading){
  return (
  <div className="min-h-screen bg-base-200 flex items-center justify-center">
    <LoaderIcon className="animate-spin size-10" />

  </div>
  );
}


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="maz-w-2xl mx-auto">

        
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Notes                 
                                        
          </Link>                        
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5"/>
            Delete Note                     
                                           
          </button>                             
                                                       
        </div>           

        <div className="card bg-base-100">
          <div className="card-body ">
            <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
                </div>


             <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Write your note here..."
                className="textarea textarea-bordered h-32"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              ></textarea>
              </div>   

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving? "Saving...":"Save Changes"}
                </button>
                </div>

          </div>
        </div>



        </div>                                         
                                                        
      </div>                                                   
     </div>                                                         
  );                                             
};                                              
                                                   
export default NoteDetailPage;                     