const express = require("express")
const cors = require("cors")
const {authRouter} = require("./Routes/auth.router")
const {connection} = require("./db")
const { notesRouter } = require("./Routes/notes.router")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/auth",authRouter)
app.use("/note",notesRouter)
app.listen(8080, async()=>{
    try {
        await connection
        console.log("Connected to DB!")
        console.log("Port is running at 8080")
    } catch (error) {
        console.log("Something went wrong!")
        console.log(error)
    }
    
})