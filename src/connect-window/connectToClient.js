const localinformation = require("../localinfo.json")
const { ipcRenderer } = require ("electron");

const {webContents, BrowserWindow} = require("electron");
window.$ = window.jquery = require("jquery");
  window.popper = require("popper.js");
  require("bootstrap");
  

const express = require("express")
const io = require("socket.io-client");
const { read } = require("original-fs");


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
const socket = io("http://localhost:8080")
const uploadButton = document.querySelector("#upload-button")
let ran = false
let selectedElement = " "


let currenctConnections = []

let allConnections = []

let info = localinformation

  console.log("Hey i jUst Dublicated")
  if (info.uid ==null) {
  socket.emit("create-id")
  console.log(info.uid)
  
  socket.on("recieve-id", function(data){
      localInfo = [{
          uid:data,
          ip:"192.168.1.34",
          port:8080,
          status:"Offline"
      }]
      info.uid = data

      console.log(info.uid)

      
      socket.emit("connection-details",localInfo)
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
  ipcRenderer.send('some-name')
  
  const path = require( "path" );
  const fs = require( 'fs' );
  const log = console.log;
  const folder = 'C:/Users/moham/Desktop';
  
  fs.readdirSync( folder ).forEach( file => {
     
     const extname = path.extname( file );
     const filename = path.basename( file, extname );
     const absolutePath = path.resolve( folder, file );
     
     
     log( "File : ", file );
     log( "filename : ", filename );
     log( "extname : ", extname );
     log( "absolutePath : ", absolutePath);
     const type = fs.lstatSync(absolutePath).isDirectory()
    CreateTableElement(filename,extname,type,0,0,0,allConnectionsTable)
  });
  
    nameMenu.style.display = "block"
    connect.value = "Connecting...";
    loader.style.display="block";
    connect.style.display="none"
    stopConnecting.style.display="block"

    nameButton.addEventListener("click", () =>{
        
        socket.emit("request-join");


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
          selectedElement=null;selectButton.classList.add("disabled")
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



  socket.on("receive-text",(data) => {
    console.log(data)
    
    
    
})


uploadButton.addEventListener("change", function(e){
  let file = e.target.files[0]
  const reader = new FileReader();
  reader.addEventListener("load",function(){
      let buffer = new Uint8Array(reader.result);
      console.log(buffer)
      
      shareFile({
        filename:file.name,
        total_buffer_size:buffer.length,
        buffer_size:1e8,
      },buffer)
  })
  reader.readAsArrayBuffer(file)
})


function shareFile(metadata,buffer){
  socket.emit("file-meta",metadata);
  while(buffer.length!=0){
    let chunk = buffer.slice(0,metadata.buffer_size)
    buffer = buffer.slice(metadata.buffer_size,buffer.length)

    
      socket.emit("file-share",{buffer:chunk})
      console.log(chunk)
    }
 
    socket.emit("finished-emitting")
  
  
  
}

