// var inputSearch = document.querySelector("#searchInput")
var eventi = []
//var checkboxSelected = []
//var textSearch = ""
//var searchParametro = ""
//var inputSearch = document.getElementById("searchInput")




async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())
        .then(json => eventi.push(json))


    console.log(eventi)
    displayCard(eventi[0].eventos)




}
getData() //viene chiamata para que sea inicializada




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

        <div class="main_div">
        <div class="div_eventos" id="">
        <h3>${eventos.name}</h3>
       <h4>${eventos.description}</h4>
        <p>Price:$${eventos.price}</p>
        <img src="${eventos.image}">
        <button class="botonCards"><a href="card_detail.html?id=${eventos.id}">Ver Más</a></button>
        
        </div>
        </div>
 
        
        `
    })
    document.querySelector('.main_div').innerHTML = html


}