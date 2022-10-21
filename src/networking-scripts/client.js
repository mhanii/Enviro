import{connect} from "../connect-window/Connect.js"
import{stopConnecting} from "../connect-window/Connect.js"
import { connectionStatus } from "../connect-window/Connect.js"; 
import {loader} from "../connect-window/Connect.js";
import { menuContainer } from "../connect-window/Connect.js";
import { menu } from "../connect-window/Connect.js";
import { about } from "../connect-window/Connect.js";
import { container } from "../connect-window/Connect.js";
const net = require("net");



export function establish_connection(ip,port){


    const options = {

        ip: ip,
        port:port
    };
    
    const client = net.createConnection(options, () => {
        
        connectionStatus.innerHTML = "Connected Successfully!";
        stopConnecting.value="Connected";
        stopConnecting.style.backgroundColor = "#5FE88D";
        loader.style.display = "none";
        menu.style.animation="disable_animation 1s";
        about.style.animation="disable_animation 1.2s";

       
        


    
    client.on("data", data => {

        connect.value = data;
   
    })
})
}
