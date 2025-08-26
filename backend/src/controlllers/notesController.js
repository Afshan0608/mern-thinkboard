import Note from "../models/Note.js ";
export async function getAllNotes(req, res) {   //if we dont want to use req we can use _ also
    // This function handles the GET request to fetch all notes
    // res.status(200).send("you fetched notes");
    //after creating the model we can use it here
    try{
        const notes=await Note.find().sort({createdAt:-1}); // Fetch all notes from the database -1 sorts them in descending order by creation date
        // Note.find() retrieves all notes, and sort({createdAt:-1}) sorts them
        res.status(200).json(notes); // Send the notes as a JSON response

    }catch(error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});


    }
}

export async function createNote(req, res) {
    // This function handles the POST request to create a new note
   
    // res.status(201).json({ message: "note created successfully" });
    try{
        const {title,content}=req.body       //we get this bcz of middleware in server.js 
        const note=new Note({title,content})
        const savedNote=await note.save(); // Save the new note to the database
        res.status(201).json(savedNote); // Send the saved note as a JSON response
    // If the note is created successfully, send a success response
    // If there is an error, catch
    }catch(error){

        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}   

export async function updateNote(req, res) {
    // This function handles the PUT request to update a note by ID
    // res.status(200).json({ message: "note updated successfully" });
    try{
        const  {title, content} = req.body; // Extract title and content from the request body
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,}); // Find the note by ID and update it the id here is the name id we gave in the route of notesroutes.js
        if(!updatedNote) return res.status(404).json({message:"Note not found"});
        // If the note is not found, return a 404 error
        // If the note is found, update it with the new title and content
  



        res.status(200).json(updatedNote); // Send the updated note as a JSON response
    // If the note is updated successfully, send a success response
    }catch(error){
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}   
export async function deleteNote(req, res) {
    // This function handles the DELETE request to delete a note by ID
    // res.status(200).json({ message: "note deleted successfully" });
    try{
        const {title,content}=req.body
        const deletedNote=await Note.findByIdAndDelete(req.params.id); // Find the note by ID and delete it
        if(!deletedNote) return res.status(404).json({message:"Note not found"})
            res.status(200).json({message:"Note deleted successfully"});
        // If the note is not found, return a 404 error
    }catch(error){
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});

    }
}   
export async function getNoteById(req, res) {
    // This function handles the GET request to fetch a note by ID
    try{
        const note=await Note.findById(req.params.id); // Find the note by ID
        if(!note) return res.status(404).json({message:"Note not found"});
        // If the note is not found, return a 404 error
        res.status(200).json(note); // Send the note as a JSON response
    }catch(error){
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}