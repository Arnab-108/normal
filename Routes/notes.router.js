const express = require("express")
const {notesModel} = require("../Model/notes.model")
const {auth} = require("../middleware/auth.middleware")
const notesRouter = express.Router()

notesRouter.use(auth)


notesRouter.get("/",async(req,res)=>{
    try {
        const notes = await notesModel.find({authorId:req.body.authorId})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send(error)
    }
})

notesRouter.post("/add",async(req,res)=>{
    try {
        const data = notesModel(req.body)
        await data.save()
        res.status(200).send({"msg":"New Note Added" , "note":req.body})
    } catch (error) {
        res.status(400).send({"err":error})
    }
})



module.exports={notesRouter}