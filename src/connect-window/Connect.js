const {webContents, BrowserWindow} = require("electron");
window.$ = window.jquery = require("jquery");
  window.popper = require("popper.js");
  require("bootstrap");
  
const { ipcRenderer  } = require ("electron");
const express = require("express")
const socket = require("socket.io")


export const connect = document.getElementById("connect");
export const stopConnecting = document.getElementById("stop-connect");
export const connectionStatus = document.getElementById("connection-status");
export const loader = document.getElementById("loader");
export const menu = document.getElementById("menu");
export const menuContainer = document.getElementById("menu-container")
export const about = document.getElementById("about");
export const container = document.getElementById("template-container");
export const connectPanelTemplate = document.getElementById("connect-panel-template")
export const managePanelTemplate = document.getElementById("manage-panel-template")
export const activeConnectionsTable = document.querySelector(".active-connections-table")
export const allConnectionsTable = document.querySelector("#all-connections-table")
const imageContainer = document.querySelector(".image-container")
const uploadButton = document.querySelector("#upload-button")
const ip = document.getElementById("IP");
const port = document.getElementById("port");
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll("[data-tab-content]")
var table_elements = []
const selectButton = document.getElementById("select")
let selectedElement = " "

let currenctConnections = []

let allConnections = []

const folder = '../';

fs.readdir( folder ).forEach( file => {
   
   const extname = path.extname( file );
   const filename = path.basename( file, extname );
   const absolutePath = path.resolve( folder, file );

   console.log( "File : ", file );
   log( "filename : ", filename );
   log( "extname : ", extname );
   log( "absolutePath : ", absolutePath);

});

function Default(){
  connect.style.backgroundColor = "#0d1925"
  loader.style.display = "none"
  connect.style.display = "block"
  stopConnecting.style.display="none"
  connect.value ="Connect"
  stopConnecting.value = "Connecting..."
  
}



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


tabs.forEach(tab=> {

  tab.addEventListener("click", () =>{
    if(!tab.classList.contains("active-tab"))
    {
      const target = document.querySelector(tab.dataset.tabTarget)
    
      tabContents.forEach(content => {
        if (content.classList.contains("active")) {
          ChangeTabs(tab,target);
        }
        
      });
    }

})
})


