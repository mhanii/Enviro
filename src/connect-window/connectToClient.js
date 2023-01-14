const localinformation = require("../localinfo.json")
const { ipcRenderer } = require ("electron");
var ss = require('socket.io-stream');
const fs = require('fs');
const {webContents, BrowserWindow} = require("electron");
window.$ = window.jquery = require("jquery");
  window.popper = require("popper.js");
  require("bootstrap");
  

const express = require("express")
const io = require("socket.io-client");
const { read } = require("original-fs");
const { data } = require("jquery");
const { url } = require("inspector");

  const sendData = document.getElementById("send-data")
  const connect = document.getElementById("connect");
  const stopConnecting = document.getElementById("stop-connect");
  const connectionStatus = document.getElementById("connection-status");
  const loader = document.getElementById("loader");
  const menu = document.getElementById("menu");
  const menuContainer = document.getElementById("menu-container")
  const about = document.getElementById("about");
  const container = document.getElementById("template-container");
  const connectPanelTemplate = document.getElementById("connect-panel-template")
  const managePanelTemplate = document.getElementById("manage-panel-template")
  const activeConnectionsTable = document.querySelector(".active-connections-table")
  const allConnectionsTable = document.querySelector("#all-connections-table")
const ip = document.getElementById("IP");
const port = document.getElementById("port");
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll("[data-tab-content]");
var table_elements = [];
const selectButton = document.getElementById("select");
const nameMenu = document.querySelector(".nameInputMenu");
const nameButton = document.querySelector(".saveButton")
const name = document.querySelector("#connectionName")
const socket = io("http://localhost:8080/")
const selectFile = document.querySelector("#select-file-button");
let ran = false
let selectedElement = " "
filesToBeShared = []
let currenctConnections = []

let allConnections = []

let info = localinformation;
const icons = {
  file: "E:/Enviro/Enviro/src/Images/file/icons8-file-144.png",
  folder: "E:/Enviro/Enviro/src/Images/folder/icons8-folder-48.png",
  textfile: "E:/Enviro/Enviro/src/Images/icons8-document-48.png",
  video: "E:/Enviro/Enviro/src/Images/video/icons8-video-48.png",
  image: "E:/Enviro/Enviro/src/Images/image/icons8-image-48.png",
  code: "E:/Enviro/Enviro/src/Images/icons8-code-file-48.png",
  zip: "E:/Enviro/Enviro/src/Images/archive/icons8-archive-48.png",
  pdf: "E:/Enviro/Enviro/src/Images/pdf/icons8-pdf-48.png",
  exe: "E:/Enviro/Enviro/src/Images/imageres_5362-3.png",
  py: "E:/Enviro/Enviro/src/Images/python/icons8-python-48.png",
  js: "E:/Enviro/Enviro/src/Images/javascript/icons8-javascript-48.png",
  excel: "E:/Enviro/Enviro/src/Images/excel/icons8-microsoft-excel-2019-48.png",
  word: "E:/Enviro/Enviro/src/Images/word/icons8-microsoft-word-2019-48.png",

}
function findtype(ext1) {
  if (ext1 == ".txt") {
    return "textfile"
  }
  else if (ext1 == ".png" || ext1 == ".jpeg" || ext1 == ".jpg" || ext1 == ".gif" || ext1 == ".png" || ext1 == ".avif" || ext1 == ".jfif") {
    return "image"
  } else if (ext1 == ".mp4" || ext1 == ".mkv") {
    return "video"
  } else if (ext1 == ".zip" || ext1 == ".rar") {
    return "zip"
  } else if (ext1 == ".pdf") {
    return "pdf"
  } else if (ext1 == ".py") {
    return "py"

  }
  else if ((ext1 == ".js")) {
    return "js"
  }
  else if ((ext1 == ".xlsx")) {
    return "excel"
  } else if (ext1 == ".docx") {
    return "word"

  }

  else if (ext1 == ".exe" || ext1 == ".bat") {
    return "exe"
  }
  else {
    return "file"
  }
}
  
  if (info.uid ==null) {
  socket.emit("create-id")
  
  
  socket.on("recieve-id", function(data){
      localInfo = [{
          uid:data,
          ip:"192.168.1.34",
          port:8080,
          status:"Offline"
      }]
      info.uid = data

      

      
      console.log(data);
  })
  
}

else{

  localInfo = [{
      uid:localinformation.uid,
      ip:localinformation.ip,
      port:localinformation.port,
      status:"Online"
  
  }]
  socket.emit("connection-details",(localInfo))
}

function refresh(){

    let localInformation = {
        name:"",
        ip:ip.value,
        port:port.value,
        status:"Online"
        } 
    
}
function Default(){
    connect.style.backgroundColor = "#0d1925"
    loader.style.display = "none"
    connect.style.display = "block"
    stopConnecting.style.display="none"
    connect.value ="Connect"
    stopConnecting.value = "Connecting..."
    
    
  }

function CreateTableElement(id,name,ip,port,device,status,target){
    const row = document.createElement("tr")
    const clientID = document.createElement("td")
    const clientName = document.createElement("td")
    const clientIP = document.createElement("td")
    const clientPort = document.createElement("td")
    const clientDevice = document.createElement("td")
    const clientStatus = document.createElement('td')
    const clientStatusIcon =document.createElement("span")
    const clientStatusText = document.createElement("p1")
    

  
    clientStatusIcon.className ="dot online";
    row.className="table-element";
    clientID.className="text";
    clientID.innerHTML=id
    clientName.className="text";
    clientName.innerHTML=name
    clientIP.className="text";
    clientIP.innerHTML=ip
    clientPort.className="text";
    clientPort.innerHTML=port
    clientDevice.className="text";
    clientDevice.innerHTML=device
    clientStatusText.className="text status"
    clientStatusText.innerHTML=" "+status
    
  
    clientStatus.appendChild(clientStatusIcon);
    clientStatus.appendChild(clientStatusText);
  
    
    

    row.appendChild(clientID)
    row.appendChild(clientName)
    row.appendChild(clientIP)
    row.appendChild(clientPort)
    row.appendChild(clientDevice)
    row.appendChild(clientStatus)
  
    target.appendChild(row);
    table_elements.push(row)

    refreshingElements();
  }

  
connect.addEventListener("click", ()=>{
  
 
  
    nameMenu.style.display = "block"
    connect.value = "Connecting...";
    loader.style.display="block";
    connect.style.display="none"
    stopConnecting.style.display="block"

    nameButton.addEventListener("click", () =>{
        
        socket.emit("request-join",ip.value);


        ran = false;
        nameMenu.style.display = "none"
    })

    socket.on("connection-accepted",function(){
        if (!ran) { 
            ran =true;
            CreateTableElement(localinformation.uid,name.value,
                ip.value,port.value,
                " PC ","Online",activeConnectionsTable)
                CreateTableElement(localinformation.uid,name.value,
                ip.value,port.value,
                " PC ","Online",allConnectionsTable)
                connect.style.display="block";
                loader.style.display="none";
                stopConnecting.style.display="none";
                connect.value="Connected"
                connect.style.backgroundColor="#4BF5AF"
                    tabs.forEach(tab=> {if (!tab.classList.contains("active-tab")){
                        Default();
                        ChangeTabs( tab,managePanelTemplate);
                    
                  }
              
                })

                socket.emit("send-text",({
                  ip:ip.value,
                  sender:info.uid,
                  text:"hey"
                }))
                
                
        }
        

    })
    


})
  
  function ChangeTabs(targetButton,nexttab){
  
    if (!nexttab.classList.contains("active")) {
      tabContents.forEach(tabContent =>{
        tabs.forEach(tab=>{
          tab.classList.remove("active-tab")
        })
  
  
        
        tabContent.style.animation="fadeout 0.3s";
        
        setTimeout(function(){
          tabContent.classList.remove("active");
          targetButton.classList.add("active-tab");
          Default();
          selectedElement=null;
          if(document.querySelector(".active-element"))
          {document.querySelector(".active-element").classList.remove("active-element")}
        
        },300)
        
      })
      if (nexttab.classList.contains("fullscreen")) {
        setTimeout(function(){container.style.width="70%"; container.style.opacity="100"},200)
  
        
          about.style.animation="fadeout 0.2s";
        
        setTimeout(function(){about.style.display="none"},200);
        
      }
      if(nexttab.classList.contains("halfscreen")) {
        container.style.width="50%";
        if(about.style.display=="none"){
  
          setTimeout(function(){about.style.animation = "fadein 0.5s";about.style.display = "block"},400) 
          
        }
        
      }
      setTimeout(function(){nexttab.style.animation = "fadein 0.3s";nexttab.classList.add("active")},350);
    }
    
  
  }
  

  function refreshingElements(){

    table_elements.forEach(element => {
      
      element.addEventListener("click", () =>{
          selectedElement = element
          table_elements.forEach(element =>{
            element.classList.remove("active-element")
          })
          element.classList.add("active-element")
          selectButton.classList.remove("disabled")
  
      })
      
  });
  
  
  }

  refreshingElements();



  socket.on("file-request",(data) => {
    data.forEach(element => {
      const parsed = element.split(".");
      console.log("parsed", parsed[parsed.length-1])
      const fileElement = document.createElement("div")
      const fileimage = document.createElement("img") ;

      fileElement.classList.add("received-file");
      fileimage.classList.add("received-file-icon");
      
      fileimage.src = icons[findtype("."+parsed[parsed.length-1])];
      
      
      
      fileElement.appendChild(fileimage);
      document.querySelector(".blur").style.display="block";
      document.querySelector(".requested-files").appendChild(fileElement);
      document.querySelector(".receive-menu-container").style.display="block";
      console.log("files-received")
    
      
    });
})

 selectFile.addEventListener("click", async ()=>{
  document.querySelector(".blur").style.display= "block"
  ipcRenderer.invoke('some-name', 0).then((result) =>{
    console.log(result)
    
    document.querySelector(".blur").style.display= "none"
    result.forEach(element => {
      filesToBeShared.push(element)
    });
    return result
  });
})




function shareFile(files){
  
  
    files.forEach(file =>{
    filesize = 0
    fs.stat(file, (err, stats) => {
      filesize = stats.size
      console.log(filesize)
      console.log(stats.blksize)
    })

    var filename = file
    var stream = ss.createStream();
    var readable = fs.createReadStream(file)

    ss(socket).emit('writestream', stream, {name: filename});
    readable.pipe(stream);

    size = 0
    readable.on('data', (chunk) => {
      fs.stat(file, (err, stats) => {
        filesize = stats.size
      })
      size += chunk.length;
      console.log(Math.floor(size / filesize * 100) + '%');
      console.log(size,filesize)
    });
    console.log(size)
    
    
  })
  

  
}

sendData.addEventListener("click",()=>{

  
  filesToBeShared.forEach(element => {
    console.log(element);
    
  });
  socket.emit("send-file-request",ip.vlaue,filesToBeShared);
})


