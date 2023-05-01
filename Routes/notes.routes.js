const express = require("express");
const {NoteModel} = require("../Model/Note.model")
const noteRouter = express.Router();


noteRouter.post("/create",async(req,res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save();
        res.status(200).send({msg:`New Note Added from ${req.body.author}`})
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes = await NoteModel.find({authorID:req.body.authorID})
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID} = req.params
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorID!==note.authorID){
            res.status(200).send({msg:`You cannot update other person note`})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({msg:`The note of this ID:${noteID} is updated`})
        }
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID} = req.params;
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorID!==note.authorID){
            res.status(200).send({msg:`You cannot delete other person note`})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({msg:`Note is deleted`})
        }
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

module.exports = {
    noteRouter
}