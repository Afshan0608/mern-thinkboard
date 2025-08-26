import React from 'react'
import {ArrowLeftIcon} from "lucide-react"
import {Link, useNavigate} from "react-router"; // Importing Link from react-router-dom to create links for navigation
import {useState} from "react"; // Importing useState hook from React to manage state in functional components
import toast from "react-hot-toast"; // Importing toast from react-hot-toast for displaying notifications
//import axios from "axios"; // Importing axios for making HTTP requests to the backend API
import api from "../lib/axios"; // Importing the axios instance created in the lib directory for making API requests

const CreatePage = () => {
  const [title,setTitle]=useState("");   //use state is a React hook that allows you to add state to functional components . here we are initializing title with an empty string and it will be used to store the title of the note 
  const [content,setContent]=useState(""); //content is another state variable that will store the content of the note
  const [loading,setLoading]=useState(false); //loading is a state variable that will be used to indicate whether the note is being created or not, initialized with false

  const Navigate=useNavigate(); //useNavigate is a hook from react-router-dom that allows you to programmatically navigate to different routes in your application

  const handleSubmit=async(e)=>{
    e.preventDefault(); //preventDefault is used to prevent the default form submission behavior, which would cause a page reload

    
    if(!title.trim()||!content.trim()){ //trim() is used to remove whitespace from both ends of a string. If title or content is empty after trimming, it will return true
      toast.error("All fields are required!"); //if title or content is empty, show an error message using toast
      return;
    }

    
    setLoading(true); //set loading to true to indicate that the note is being created
    try{
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note created successfully")
      Navigate("/") ; //navigate to the home page after the note is created successfully
    }catch(error)
    {
      console.log("Error creating note", error); //log the error to the console
      if(error.response.status===429)
        {
          toast.error("Slow down! You're creating notes too fast!",{
            duration: 4000, //duration of the toast message in milliseconds
            icon:"😵‍💫"  //win+.
          }); //if the error status is 429, show a specific error message
        } 
        else
        {
          toast.error("Failes to create note");
        }
    }finally{
      setLoading(false);  //set loading to false after the note is created or if there is an error
    }
  }  ;




  return (



    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/"} className="btn btn-ghost mb-6">
           <ArrowLeftIcon className="size-5"/>
            Back to notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>           {/*onSubmit event handler to handle form submission */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">
                      Title
                    </span>
                  </label>
                  <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"         //input element with type text and placeholder "Note Title" and className input input-bordered for styling
                  value ={title}                            //value of the input is bound to the title state variable
                  onChange={(e)=>setTitle(e.target.value)}       //onChange event handler to update the title state when the input value changes
                  />

                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">
                      Content
                    </span>
                  </label>
                 <textarea 
                 placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"  //textarea element with placeholder "Write your note here..." and className textarea textarea-bordered for styling
                  value={content}                            //value of the textarea is bound to the content state variable
                  onChange={(e)=>setContent(e.target.value)}  //onChange event handler to
                  /> 
                </div>

                <div className="card-actions justify-end">
                  <button type="Submit" className="btn btn-primary" disabled={loading}>
                    {loading?"Creating...":"Create Note"}  {/*button to submit the form with className btn btn-primary for styling and disabled state based on loading variable */  }
                  </button>

                </div>
              </form>

            </div>


          </div>

        </div>

      </div>


    </div>




  )
};

export default CreatePage;