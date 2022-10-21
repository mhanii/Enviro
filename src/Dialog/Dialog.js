const { fdatasync } = require("original-fs")
const path = require( "path" );
  const fs = require( 'fs' );

var table_elements =[]
const icons = {
  file:"E:/Enviro/Enviro/src/Images/icons8-file-windows-11-color/icons8-file-144.png",
  folder:"E:/Enviro/Enviro/src/Images/icons8-folder-color/icons8-folder-48.png",
  textfile:"E:/Enviro/Enviro/src/Images/icons8-document-48.png",
  video:"E:/Enviro/Enviro/src/Images/icons8-video-file-windows-11-color/icons8-video-file-48.png",
  image:"E:/Enviro/Enviro/src/Images/icons8-image-file-windows-11-color/icons8-image-file-48.png",
  code:"E:/Enviro/Enviro/src/Images/icons8-code-file-48",
  zip:"E:/Enviro/Enviro/src/Images/icons8-archive-windows-11-color/icons8-archive-48.png",
  pdf:"E:/Enviro/Enviro/src/Images/icons8-pdf-windows-11-color/icons8-pdf-48.png",
  exe:"E:/Enviro/Enviro/src/Images/file-exe-icon.png"
}
function findtype(ext1){
  if (ext1 ==".txt") {
    return "textfile"
  }
  else if (ext1 ==".png"||ext1 ==".jpeg"||ext1 ==".jpg"||ext1 ==".gif"||ext1 ==".png"||ext1 ==".avif"||ext1 ==".svg") {
    return "image"
  }else if (ext1 ==".mp4"||ext1 ==".mkv"){
    return "video"
  }else if (ext1 ==".zip" ||ext1 ==".rar") {
    return "zip"
  }else if (ext1==".pdf") {
    return "pdf"
  }else if (ext1==".py"||ext1==".js") {
    return "code"
  }else if (ext1==".exe") {
    return "exe"
  }
  else{
    return "file"
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
      
  })};



function CreateTableElement(name,date,ext,size,type){
    const Frow = document.createElement("tr")
    const FiconContainer = document.createElement("td")
    const Ficon = document.createElement("img")
    const Fname = document.createElement("td")
    const Fdate = document.createElement("td")
    const Fext = document.createElement("td")
    const Fsize = document.createElement("td")
    const target = document.querySelector("#all-Fs-table")

  
    
    Frow.className="table-element";
    Fname.className="text";
    Fname.innerHTML=name
    Fdate.className="text";
    Fdate.innerHTML=date;
    Fext.className="text";
    Fext.innerHTML=ext
    Fsize.className="text";
    Fsize.innerHTML=size
    
    
    
  
  
    
    if (type == true) {
      Ficon.src=icons["folder"]
      
    }else if (type==false) {
      Ficon.src=icons[findtype(ext)]
    }else{
      Ficon.src=icons["file"]
    }
    
    Ficon.classList.add("icon")
    FiconContainer.append(Ficon)
    Frow.append(FiconContainer)
    
    Frow.appendChild(Fname)
    Frow.appendChild(Fdate)
    Frow.appendChild(Fext)
    Frow.appendChild(Fsize)
    
  
    target.appendChild(Frow);
    table_elements.push({row:Frow,type:type})
    
    refreshingElements();
  


  }
const folder = 'C:/Users/moham/Desktop';
  

function loadElements(folder){

  fs.readdirSync( folder ).forEach( file => {
     
    const extname = path.extname( file );
    const filename = path.basename( file, extname );
    const absolutePath = path.resolve( folder, file );
    let lastModified = ""
    let  size = 0
    fs.stat(absolutePath, (err, stats) => {
        if (err) {
          throw err
        }else {
          lastModified = stats["mtime"]
          const d = new Date(lastModified);
          lastModified =d.toLocaleDateString() +"  "+ d.toString().slice(16,24)
         
          
          //lastModified
          const type = fs.lstatSync(absolutePath).isDirectory()
          console.log(type)
         size = stats.size
         CreateTableElement(filename,lastModified,extname,size,type)}
    })
    
    
  });

}
