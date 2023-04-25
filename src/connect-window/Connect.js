const {webContents, BrowserWindow} = require("electron");
window.$ = window.jquery = require("jquery");
  window.popper = require("popper.js");
  require("bootstrap");
export const connect = document.getElementById("connect");
export const stopConnecting = document.getElementById("stop-connect");
export const connectionStatus = document.getElementById("connection-status");
export const loader = document.getElementById("loader");
export const menu = document.getElementById("menu");
export const menuContainer = document.getElementById("menu-container")
export const filetransfers = document.getElementById("transfers");
export const container = document.getElementById("template-container");
export const connectPanelTemplate = document.getElementById("connect-panel-template")
export const managePanelTemplate = document.getElementById("manage-panel-template")
export const activeConnectionsTable = document.querySelector(".active-connections-table")
export const allConnectionsTable = document.querySelector("#all-connections-table")
const imageContainer = document.querySelector(".image-container")
const uploadButton = document.querySelector("#upload-button")
const fileTransferButton = document.querySelector('#fileTransferButton')
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
let x = 0;
let transferOpen = 1;


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
        selectedElement=null;
        if(document.querySelector(".active-element"))
        {document.querySelector(".active-element").classList.remove("active-element")}
      
      },300)
      if(!x)
      {
        emergeTransferTab()
      }
      x=1
      
      setTimeout(function(){nexttab.style.animation = "fadein 0.3s";nexttab.classList.add("active")},350);
    })
    
  

}
}

function emergeTransferTab(){

  if (transferOpen) {

    setTimeout(function(){container.style.width="75%";},100)
    document.querySelector(".transfer-elements-container").style.animation="fadeout 0.2s"
    setTimeout(function(){document.querySelector(".transfer-elements-container").style.display="none";filetransfers.style.animation="fadeoutTransfers 0.4s";},100);
        
    setTimeout(function(){filetransfers.style.display="none"},300);
    transferOpen = 0;
  }
  else if(!transferOpen) {
    
    container.style.width="50%";

    setTimeout(function(){document.querySelector(".transfer-elements-container").style.animation="fadein 0.4s";document.querySelector(".transfer-elements-container").style.display="block";},400);
    setTimeout(function(){filetransfers.style.animation="fadeinTransfers 0.3s";filetransfers.style.display = "block"},300) 
    transferOpen = 1
    
  }
  
}

fileTransferButton.addEventListener("click", ()=>{

  emergeTransferTab();
  console.log("It should Work")
  x = 1
})

tabs.forEach(tab=> {
  console.log("tab is found")
  tab.addEventListener("click", () =>{
    console.log("tab is clicked")
    if(!tab.classList.contains("active-tab"))
    {
      const target = document.querySelector(tab.dataset.tabTarget)
      console.log(target)
      tabContents.forEach(content => {
        if (content.classList.contains("active")) {
          ChangeTabs(tab,target);
        }
        
      });
    }

})
})



