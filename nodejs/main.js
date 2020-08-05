const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./key')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./model/user')
//require('./model/post')

app.use(express.json())
app.use(require('./route/auth'))
//app.use(require('./route/post'))
//app.use(require('./routes/user'))


/*if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}*/

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
/*const express=require('express');
/*if(process.env.NODE_ENV=="production"){
//	res.send("hello world");
//	res.send("user  data access");
//app.get("/",(req,res)=>
//app.get("/user",(req,res)=>
//app.use(require('./routes/user'))
//{
//{
//});
//});
/app.use(require('./route/post'))
app.listen(3000,()=>console.log("sever run"));*/


