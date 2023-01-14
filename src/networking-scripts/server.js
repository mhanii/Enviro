const express = require("express");

const path = require("path");
const { data } = require("jquery");
const app = express();
var ss = require('socket.io-stream');
const server = require("http").createServer(app);

const io = require("socket.io")(server,{
    maxHttpBufferSize: 1e8
});

const fs = require("fs")
let allIDS = []

app.use(express.static(path.join(__dirname+"/public")))

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var allConnections = new Object;
var allConnections = {}

io.on("connection", function(socket){
    socket.join(socket.id);

    let connectionID = 0
    let id = 0;
    socket.on("connection-details", function(data){
        
    
        
    })
    socket.on("disconnect", function(e){

       
       
    })

    socket.on("create-id", ()=>{
        
        
        id = generateRandomIntegerInRange(1000,9999)
        
        socket.emit("recieve-id",id);
        socket.join(toString(id));
        allConnections[id] = socket.id;
        console.log(allConnections)

    })
    socket.on("request-join", (id,list)=>{

        socket.join(toString(id));
        
        setTimeout(() => {
            socket.emit("connection-accepted")
        }, 1000); 
            console.log("request accepted")


    })
    socket.on("send-file-request",(id,list)=>{
        socket.in(toString(id)).emit("file-request",list);

    })
   
    
    /*
    ss(socket).on('writestream', function(stream,name) {
        console.log("receiving file")
        var filename = path.basename(`./${name.name}`);
        stream.pipe(fs.createWriteStream(filename));

      });
      
    */
    })


server.listen(8080);