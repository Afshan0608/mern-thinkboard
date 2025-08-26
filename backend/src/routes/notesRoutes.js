
import express from 'express';
import {deleteNote, getAllNotes, updateNote,createNote,getNoteById} from "../controlllers/notesController.js"; // Importing the controller function
// Importing the express module and the notesController 

const router= express.Router();

//before using the controller function, we can define the routes directly
// router.get("/", (req, res) => { // GET request to fetch all notes
//     res.status(200).send("you fetched notes");
// });
//after using the controller function, we can define the routes like this

router.get("/", getAllNotes); // GET request to fetch all notes using the controller function   
                     
// router.put("/:id", (req, res) => { // PUT request to update a note by ID
//     res.status(200).json({ message: "note updated successfully" });
// });

router.put("/:id",updateNote); // PUT request to update a note by ID using the controller function

router.post("/",createNote); // POST request to create a new note using the controller function

// router.delete("/:id", (req, res) => { // DELETE request to delete a note by ID
//     res.status(200).json({ message: "note deleted successfully" });
// }); 

router.delete("/:id",deleteNote);
router.get("/:id",getNoteById);

export default router;

