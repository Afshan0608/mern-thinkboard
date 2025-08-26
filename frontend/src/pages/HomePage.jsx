import {useState} from 'react'
import Navbar from '../components/Navbar'; // Importing Navbar component from components directory
import RateLimitedUI from '../components/RateLimitedUI';
import {useEffect} from 'react';
//import axios from 'axios'; // Importing axios for making HTTP requests
import api from '../lib/axios'; // Importing the axios instance created in the lib directory
import toast from "react-hot-toast";
import NoteCard from '../components/NoteCard'; // Importing NoteCard component to display individual notes
import NotesNotFound from '../components/NotesNotFound'; // Importing NotesNotFound component to display when no notes are found


const HomePage = () => {
  const [isRateLimited,setIsRateLimited]=useState(false); // State to manage rate limiting UI visibility //state in react means a variable that can change over time, and useState is a hook that allows you to add state to functional components in React. Here, isRateLimited is a boolean state variable initialized to true, and setIsRateLimited is the function used to update its value.
  // isRateLimited is a boolean state variable initialized to false, indicating that the user is not rate-limited.
  // setIsRateLimited is a function that can be used to update the value of isRateLimited.
  // When isRateLimited is true, the RateLimitedUI component will be displayed, indicating that the user has exceeded their rate limit for creating new notes.
  const [notes,setNotes]=useState([]);
  // State to manage the list of notes, initialized as an empty array
  // notes is an array state variable initialized to an empty array, which will hold the list
  const [loading,setLoading]=useState(true);
  // State to manage the loading state, initialized to true
  // loading is a boolean state variable initialized to true, indicating that the application is currently loading data (e.g., fetching notes from the server).
  // setLoading is a function that can be used to update the value of loading.
  useEffect(()=>{

    const fetchNotes=async()=>{
      try{
        // const res=await fetch("http://localhost:5001/api/notes");   this is how we use fetch

        // const data = await res.json();   we dont need thid to use axios
        // console.log(data);

        const res=await api.get("/notes");  // Using axios to make a POST request to the API endpoint to fetch notes  // api.get is a method provided by axios to make GET requests, and it returns a promise that resolves to the response object.
        // The response object contains the data returned by the server, which is the list of notes
        //instead of http://localhost:5001/api/notes, we are using api.get("/notes") which is the same as axios.get("http://localhost:5001/api/notes")
        console.log(res.data);  // Logging the response data to the console
        setNotes(res.data)   // Setting the fetched notes data to the notes state variable
        setIsRateLimited(false) // Setting isRateLimited to false, indicating that the user is not rate-limited
        


      }catch(error){
        console.log("Error fetching notes");   // Logging an error message to the console if the fetch operation fails 
        console.log(error);  // Logging the error object to the console for debugging purposes
        if(error.response?.status ===429)      // Checking if the error status is 429 (Too Many Requests)
        {
          setIsRateLimited(true);   // If the error status is 429 (Too Many Requests), set isRateLimited to true to show the rate-limited UI

        }else{
          toast.error("Failed to load notes")  // Displaying an error toast notification if the fetch operation fails
        }
      } finally{
        setLoading(false); // Setting loading to false after the fetch operation is complete, regardless of success or failure
      }
    };
    fetchNotes();
  },[]); 
  


  


  return (
    <div className="min-h-screen">
      <Navbar/>
      {isRateLimited && <RateLimitedUI/>}

    <div className="max-w-7xl mx-auto p-4 mt-6">
    {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

    {notes.length===0 && !isRateLimited && <NotesNotFound/>}
      
    {notes.length>0 && !isRateLimited && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {notes.map(note=>(
          <NoteCard key={note._id} note={note} setNotes={setNotes} />   // setnotes is necessary for updating the notes state after deleting a note
         ))}
      </div>
    )}

    </div>


    </div>





  )
}

export default HomePage