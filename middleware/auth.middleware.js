const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        try {
            const decode = jwt.verify(token, "noteapp")
            
            if (decode) {
                console.log(decode)
                req.body.authorId = decode.authorId
                req.body.author = decode.author
                next()
            }
            else {
                res.send({ "msg": "Not Authorized!" })
            }
        } catch (error) {
            res.send({"err":error})
        }

    }
    else{
        res.send({"msg":"Please Login First!"})
    }
}

module.exports={auth}