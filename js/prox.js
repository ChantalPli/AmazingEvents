var eventi = []
var checkboxSelected = []
var textSearch = ""
var searchParametro = ""
var inputSearch = document.getElementById("searchInput")
var past = []

inputSearch.addEventListener("keyup", search)


async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())

        .then(json => past.push(json))
    console.log(past)

    eventi.push({ eventos: past[0].eventos.filter(evento => evento.date > past[0].fechaActual) })
    console.log(eventi)
    displayCard(eventi[0].eventos)



    //crear checkbox dinamico

    var unique = eventi[0].eventos.map(newevent => newevent.category)
    const dataArray = new Set(unique)
    var category = [...dataArray]
    console.log(category)

    var inputCheckbox = ""
    category.forEach(categoria => {
        inputCheckbox += `<label class="micheckbox" ><input type="checkbox" class="checkboxCont" value="${categoria}"> ${categoria}</label>`
    })
    document.querySelector('#checkBoxCategory').innerHTML = inputCheckbox


    //ahora se capturan y se escuchan gli eventi dei vari checkbox
    var checkbox = document.querySelectorAll(".checkboxCont")

    checkbox.forEach(check => check.addEventListener("click", function (event) {
        var checked = event.target.checked

        if (checked == true) {
            checkboxSelected.push(event.target.value)

            dataCheck(checkboxSelected)
        } else {
            checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== check.value)

            dataCheck(checkboxSelected)
        }

    }))

}
getData() //viene chiamata para que sea inicializada


function dataCheck(checkboxSelected) {
    var data = []
    checkboxSelected.map(categoria => {
        data.push(...eventi[0].eventos.filter(evento => evento.category == categoria))
    })

    displayCard(data)


}


function search(event) {
    var val = event.target.value
    var datos = eventi[0].eventos.filter(eventos => eventos.name.toLowerCase().includes(val.toLowerCase()))
    displayCard(datos)

    console.log(datos)
}



function displayCard(datos) {
    console.log(datos)
    var toDisplay = []
    if (datos == undefined) {
        toDisplay.push(...datos)
        console.log(toDisplay)
    } else {
        toDisplay.push(...datos)

    }



    var html = ""
    toDisplay.map(eventos => {
        html += `

        <div id="mainCards">
        <div class="div_h3_events" id="prox_concerts">
        <h3>${eventos.name}</h3>
        <div>
            <img src="${eventos.image}">
        </div>
        <p class="p_div">${eventos.price}</p>
        <p>${eventos.description}</p>
        <p>Price:$${eventos.price}</p>
        <p>Place:${eventos.place}</p>
        <p>Capacity:${eventos.capacity}</p>
    </div>
    </div>
 
        
        `
    })
    document.querySelector('#mainCards').innerHTML = html


}





































