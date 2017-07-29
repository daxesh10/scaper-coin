const
    express = require('express'),
    path = require('path')

let firebaseClient = require('./firebaseClient.js')    

const app = express()
let port = process.env.PORT || 8081
app.use(express.static(path.join(__dirname+'/client')))
//app.use(require('./client/routes')())

app.get('/',(req,res)=>{

    res.sendFile("client/index.html")

})

app.get('/signup',(req,res)=>{

    res.sendFile("client/views/signup.html")
})




app.listen(port,()=>{

    console.log('server running on. \n localhost:',port)
})