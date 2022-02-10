var eventi = []

async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())
        .then(json => eventi.push(...json.eventos))

    var id = 1
    eventi.map(item => item.id = id++)


    console.log(eventi)


    console.log(location)
    var id = location.search.split("?id=").filter(Number) //con split vamos a separar el search en el parametro ?id y luego se filtra el boolean que sea igual a true( separa de ?id l;os numeros). Location es un atributo de js;toma la url
    var selectedId = Number(id[0])//lo convierto en numero
    console.log(selectedId);
    var evento = eventi.find(function (evento) { //(la funzione anonima si utilizza per poter passare un paramentro(evento))Questa parte cerca,grazie al metodo find, dentro il mio array eventi,dentro gli id di ogni oggetto, quello che sia uguale al selected id della linea 17
        return evento.id == selectedId

    })

    console.log(evento);
    var templateHtml = `  



        <div id= "mainCards" >
            <div class="div_h3_events" id="prox_concerts">
                <h3>${evento.name}</h3>
                <div>
                    <img src="${evento.image}">
                </div>
                <p class="p_div">${evento.price}</p>
                <p>${evento.description}</p>
                <p>Price:$${evento.price}</p>
                <p>Place:${evento.place}</p>
                <p>Capacity:${evento.capacity}</p>

            </div>
            </div>
    

        `
    document.querySelector('#mainCards').innerHTML = templateHtml
}





getData()
