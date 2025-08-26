import mongoose from "mongoose";
// 1.create a schema for the note model
const noteSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        // here also we can add timestamp 

    },
    {
        timestamps:true   //createdAt,updatedAt
    }
);

// 2.create a model using the schema

const Note=mongoose.model("Note",noteSchema)   // "Note" is the name of the model, and noteSchema is the schema we defined above and all notes will have same pattern schema
// 3.export the model
export default Note;