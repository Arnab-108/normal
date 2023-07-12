const mongoose= require("mongoose")

const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    authorId:{type:String,required:true},
    category:{type:String,required:true}
},{
    versionKey:false
})

const notesModel = mongoose.model("notes",noteSchema)

module.exports={notesModel}