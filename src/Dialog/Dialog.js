const { fdatasync } = require("original-fs")
const path = require("path");
const fs = require('fs');
const { ipcRenderer, ipcMain } = require("electron");
const { json } = require("express");
const sortjsonarray = require("sort-json-array");
sortJsonArray = require('sort-json-array');
const goBack = document.querySelector(".arrows")
const sortDownButton = document.querySelector(".sort-down");
const sortUpButton = document.querySelector(".sort-up");
let table_elements = []
let selectedElements = []
const sortButton = document.querySelector(".sort");
const selectButton = document.querySelector(".select");
const closeButton = document.querySelector(".close-button-container");
const locationBar = document.querySelector("#locationBar")
const goForward = document.querySelector(".right-arrow")
const systemApps = document.querySelectorAll(".sys-app")
const cancel = document.querySelector(".cancel");
const drivelist = require('drivelist');
let downloadsFolder = process.env.USERPROFILE + "/Downloads";
let desktopFolder = process.env.USERPROFILE + "/Desktop";
let documentsFolder = process.env.USERPROFILE + "/Documents";
let downloadFolder = process.env.USERPROFILE + "/Videos";
console.log(downloadsFolder, desktopFolder, documentsFolder);
const sort = [{
  sort: "E:/Enviro/Enviro/src/Images/sort/icons8-sort-96.png",
  sortAsc: "E:/Enviro/Enviro/src/Images/sort-up/icons8-sort-up-96.png",
  sortDesc: "E:/Enviro/Enviro/src/Images/sort-down/icons8-sort-down-96.png"

}]
let currentDestination = ""
let drives = []
const icons = {
  file: "E:/Enviro/Enviro/src/Images/file/icons8-file-144.png",
  folder: "E:/Enviro/Enviro/src/Images/folder/icons8-folder-48.png",
  textfile: "E:/Enviro/Enviro/src/Images/icons8-document-48.png",
  video: "E:/Enviro/Enviro/src/Images/video/icons8-video-48.png",
  image: "E:/Enviro/Enviro/src/Images/image/icons8-image-48.png",
  code: "E:/Enviro/Enviro/src/Images/icons8-code-file-48.png",
  zip: "E:/Enviro/Enviro/src/Images/archive/icons8-archive-48.png",
  pdf: "E:/Enviro/Enviro/src/Images/pdf/icons8-pdf-48.png",
  exe: "E:/Enviro/Enviro/src/Images/file-exe-icon.png",
  py: "E:/Enviro/Enviro/src/Images/python/icons8-python-48.png",
  js: "E:/Enviro/Enviro/src/Images/javascript/icons8-javascript-48.png",
  excel: "E:/Enviro/Enviro/src/Images/excel/icons8-microsoft-excel-2019-48.png",
  word: "E:/Enviro/Enviro/src/Images/word/icons8-microsoft-word-2019-48.png",

}
systemApps.forEach(app => {
  if (app.classList[0] === "This-pc") {

  } else {
    app.addEventListener("click", () => {
      currentDestination = process.env.USERPROFILE + "/" + app.classList[0];
      table_elements.forEach(element1 => {
        element1.row.remove()
      })
      loadElements(currentDestination)
      console.log(currentDestination)
    })

  }

});
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


async function getDrivers() {
  const drives = await drivelist.list();
  drives.forEach(drive => {
    console.log(drive)
    drive.mountpoints.forEach(path => {
      drives.push(path.path);
      addElement(path.path, true, "")
    });

  });

}
getDrivers();



locationBar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    try {
      table_elements.forEach(element1 => {
        element1.row.remove()
      })
      loadElements(locationBar.value)
    } catch (error) {
      console.log(error)
    }
  }
});
closeButton.addEventListener("click", function () {
  ipcRenderer.send('close-app')
  ipcRenderer.send('array-path', '');

})
cancel.addEventListener("click", function () {
  ipcRenderer.send('close-app')
  ipcRenderer.send('array-path', '');

})

indexOfClicks = 1
goBack.addEventListener("click", () => {
  table_elements.forEach(element1 => {
    element1.row.remove()
  })
  loadElements(parent)


})


function refreshingElements(currentFolder) {

  table_elements.forEach(element => {

    element.row.addEventListener("click", () => {
      const row = [element.row.cells.item(1).innerHTML, element.row.cells.item(4).innerHTML]
      console.log(element)


      if (element.type == true) {
        table_elements.forEach(element1 => {
          element1.row.remove()
        })
        loadElements(element["location"])
        console.log("i dublicated")


        table_elements.forEach(element2 => {
          element2["row"].classList.remove("active-element")
        })
        element["row"].classList.add("active-element")

      } else {
        addElement(row[0], false, element.ext)
        table_elements.forEach(element => {
          element.row.classList.remove("active-element")
        })

        element.row.classList.add("active-element")
        selectedElements.push(element["location"])
        console.log(selectedElements
        )
      }

    })

  })
};





function CreateTableElement(name, date, ext, size, type, absPath) {
  const Frow = document.createElement("tr")
  const FiconContainer = document.createElement("td")
  const Ficon = document.createElement("img")
  const Fname = document.createElement("td")
  const Fdate = document.createElement("td")
  const Fext = document.createElement("td")
  const Fsize = document.createElement("td")
  const target = document.querySelector("#all-Fs-table")



  Frow.className = "table-element";
  Fname.className = "text";
  Fname.innerHTML = name
  Fdate.className = "text";
  Fdate.innerHTML = date;
  Fext.className = "text";
  Fext.innerHTML = ext.replaceAll(".", "").toUpperCase()
  Fsize.className = "text";
  Fsize.innerHTML = size






  if (type == true) {
    Ficon.src = icons["folder"]

  } else if (type == false) {
    Ficon.src = icons[findtype(ext)]
  } else {
    Ficon.src = icons["file"]
  }

  Ficon.classList.add("icon")
  FiconContainer.classList.add("icontd")
  FiconContainer.append(Ficon)
  Frow.append(FiconContainer)
  Fname.classList.add("nametd")
  Frow.appendChild(Fname)
  Fdate.classList.add("datetd")
  Frow.appendChild(Fdate)
  Frow.appendChild(Fext)

  Frow.appendChild(Fsize)

  Frow.style.borderRadius = "1rem"

  target.appendChild(Frow);
  table_elements.push({ row: Frow, type: type, location: absPath, ext: ext })






}
function addElement(name, isDirectory, ext) {
  if (isDirectory === true) {
    const img = document.createElement("img")
    const Frow = document.createElement("tr")
    const Fname = document.createElement("h4")

    img.src = "E:/Enviro/Enviro/src/Images/drive.png"
    img.classList.add("icontdDrivelist")
    const target = document.querySelector(".dr-elements")



    Frow.className = "table-element";
    Frow.classList.add("driveslist")
    Fname.className = "h4text";
    Fname.innerHTML = "Volume (" + name.replaceAll("\\", "") + ")"

    let tempName = name
    tempName = tempName.replaceAll("Volume (").replaceAll(")")

    Fname.classList.add("nametdDriveList")
    Frow.appendChild(img)
    Frow.appendChild(Fname)

    Frow.classList.add("driveslist")
    Frow.addEventListener("click", () => {
      table_elements.forEach(element1 => {
        element1.row.remove()
      })
      loadElements(tempName)

    })
    target.appendChild(Frow);
  }
  else {
    const fdiv = document.createElement("div");
    const fimg = document.createElement("img");
    const ftext = document.createElement("h5");
    ftext.innerHTML = name;
    ftext.classList.add("h4textse")
    fimg.src = icons[findtype(ext)]

    fimg.classList.add("iconse");

    fdiv.classList.add("element-selected")
    fdiv.appendChild(fimg);
    fdiv.appendChild(ftext);
    document.querySelector(".wraper").appendChild(fdiv)



  }


}
const folder = 'C:/';
let parent = ""
let previousFolders = []





function sortBySize(items) {

  let itemSize = []

  for (let i = 0; i < items.length; i++) {



    itemSize.push([items[i], items[i].size])

  }
  itemSize.sort(function (a, b) {
    return b[1] - a[1];

  })
  for (let i2 = 0; i2 < itemSize.length; i2++) {
    CreateTableElement(itemSize[i2][0].name, itemSize[i2][0].date, itemSize[i2][0].type, formatBytes(itemSize[i2][0].size), itemSize[i2][0].isdirectory, itemSize[i2][0].path)

  }
}
function sortByName(items) {
  itemName = items
  itemName.sort()
  itemName.forEach(i2 => {

    CreateTableElement(i2.name, i2.date, i2.type, formatBytes(i2.size), i2.isdirectory, i2.path)

  })
}

function sortByType(items) {

}


function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return ''

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}



function loadElements(folder) {

  const folderlocationWithoutBackslash = folder.replaceAll('\\', '/')
  locationBar.value = folderlocationWithoutBackslash
  parent = path.resolve(folder, "../")
  console.log(parent)
  previousFolders.push(folder)
  let currentFolder = " "
  const data = fs.readdirSync(folder)


  for (let index = 0; index < data.length; index++) {
    items = []

    const extname = path.extname(data[index]);
    const filename = path.basename(data[index], extname);
    const absolutePath = path.resolve(folder, data[index]);
    let lastModified = ""
    let size = 0


    fs.stat(absolutePath, (err, stats) => {
      if (err) {
        throw err
      } else {
        lastModified = stats["mtime"]
        const d = new Date(lastModified);
        lastModified = d.toLocaleDateString() + "  " + d.toString().slice(16, 24)


        const type = fs.lstatSync(absolutePath).isDirectory()


        size = stats.size
        if (type == true) {
          size = ""
        }
        let newSize = size
        items.push({ name: filename, date: lastModified, type: extname, size: newSize, isdirectory: type, path: absolutePath })

        if (index >= fs.readdirSync(folder).length - 1) {

          sortBySize(items)

          refreshingElements(absolutePath)
        }

      }

    })
  }

}


selectButton.addEventListener("click", () => {

  ipcRenderer.send("array-path", selectedElements)
  console.log(selectedElements)
  console.log("data-sent")
  ipcRenderer.send("close-app")

})



loadElements(folder)



