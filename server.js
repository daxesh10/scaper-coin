const
    express = require('express'),
    path = require('path')

let firebaseClient = require('./firebaseClient.js')    

const app = express()
let port = process.env.PORT || 8081
app.use(express.static(path.join(__dirname+'/client')))

app.get('/',(req,res)=>{

    console.log(" index.html called")    
    res.sendFile("client/index.html")

})

app.get('/signup',(req,res)=>{

    res.sendFile("client/views/signup.html")
})

app.get('/map',(req,res)=>{

    res.sendFile(__dirname+"/client/views/map.html")
         
                      
})


app.listen(port,()=>{

    console.log('server running on. \n localhost:',port)
})