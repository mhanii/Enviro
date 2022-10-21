const table_elements = document.querySelectorAll("[element]")


table_elements.forEach(element => {
    console.log(element)
    element.addEventListener("click", () =>{
        console.log(element)

    })
    
});