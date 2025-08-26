import React from 'react'
import {Route,Routes} from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
// Importing React and necessary components from react-router-dom
// Importing HomePage and CreatePage components from the pages directory
      // import toast from "react-hot-toast";  // Importing toast from react-hot-toast for displaying notifications
 


const App = () => {
  return (
    <div className="relative h-full w-full">
  {/*  <div  data-theme="forest">     before this was used but we want the home page bg to be back against the grids so we use the above one */}     
    {/* Setting the theme to 'forest' using data-theme attribute */}
             {/* <button onClick={()=>toast.success("congrats")} className="text-red-500 p-4 bg-pink-300">Click me</button>   */}
     
      {/* <button className="btn">Button</button>
<button className="btn btn-neutral">Neutral</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-link">Link</button>
      <button className="btn btn-primary">Click me</button> */}
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      
      <Routes>   
                     {/* Importing Routes from react-router-dom */}
        <Route path="/" element={<HomePage />} /> 
                                                       {/* HomePage component it will render when the path is "/" to homepage */}
        <Route path="/create" element={<CreatePage/>} /> 
                                                        {/* CreatePage component it will render when the path is "/create" to create a new note */}
        <Route path="/note/:id" element={<NoteDetailPage />} /> 
                                                                   {/* NoteDetailPage component it will render when the path is "/note/:id" to view a specific note by its id */}
      </Routes>


    </div>
  )
};

export default App;