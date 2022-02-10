
const porcentajeMenor = document.getElementById("porcentaje_menor")
const mayorCapacidadd = document.getElementById("mayor_capacidad")
const datiTabla = document.getElementById("datiTabla")
const porcentajeMayor = document.getElementById("porcentaje_mayor")

let mayorPorcentaje = 0;
let menorPorcentaje = 0
let mayor_Capacidad = 0
let ingresoCategoria = []
let arrayDato = []
let arrayCategoria = []
let porcentajeAsistenciaCategoria = []
let fechaActual = ""


//function getData
getData()

async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then((promise) => promise.json())
        .then((datos) => {
            fechaActual = datos.fechaActual;
            arrayDato.push(...datos.eventos);


            MayorMenor();

            mayorCapacidad();

            ingressoCategoria();

            porcentajeAsistencia_Categoria();

            final();




            // console.log(mayorPorcentaje);

            porcentajeMayor.innerText = `${mayorPorcentaje.name   //calcoliamo l'evento con una percentuale di affluenza maggiore e minore
                } : ${mayorPorcentaje.porcentajeAsistencia.toFixed(2)}%`;

            console.log(mayorPorcentaje);


            porcentajeMenor.innerText = `    
            ${menorPorcentaje.name} : ${menorPorcentaje.porcentajeAsistencia.toFixed(2)} % 


             `;

            mayorCapacidadd.innerText = `${mayor_Capacidad.name} : ${mayor_Capacidad.capacity}`; // questo è l'evento con la maggiore capacità




            console.log(ingresoCategoria);
            ingresoCategoria.forEach((evento) => {      //
                if (isNaN(evento.porcentaje)) {
                    datiTabla.innerHTML += `
                    <td>${evento.nombre}</td>
                    <td> Ingreso Estimado ${evento.ingresos}</td>
                    <td> Porcentaje Estimado ${evento.porcentaje}</td>
                    
                    `
                } else {
                    datiTabla.innerHTML += `
                    <td>${evento.nombre}</td>
                    <td>  ${evento.ingresos}</td>
                    <td> ${evento.porcentaje}</td>
                    `
                }
            })


        });


}
console.log(ingresoCategoria);
console.log(porcentajeAsistenciaCategoria);

//-----FUNZIONE FINALE-----
function final() {    //
    let arrayFinal = [...ingresoCategoria];  //
    arrayFinal.map((valor) => {
        let objetoPor = "";
        objetoPor = porcentajeAsistenciaCategoria.find((porcen) => porcen.categoria == valor.nombre); // si mette solo la catgoria y 
        return (valor.porcentaje = objetoPor.porcentaje);

    });
}

//------------//

//----------FUNZIONE ASSISTENZA MAGGIORE E MINORE---------//
function MayorMenor() {
    let arraySort = [];
    arraySort.push(...arrayDato)

    arraySort.map((evento => {

        evento.porcentajeAsistencia = (evento.assistance * 100) / evento.capacity;


    }))
    console.log(arraySort);

    let arrayMenoMas = []
    arrayMenoMas.push(...arraySort.filter((evento) => evento.assistance !== undefined));
    arrayMenoMas.sort((a, b) => b.porcentajeAsistencia - a.porcentajeAsistencia);
    console.log(arrayMenoMas);
    mayorPorcentaje = arrayMenoMas[0]
    console.log(mayorPorcentaje);
    menorPorcentaje = arrayMenoMas[arrayMenoMas.length - 1]
    console.log(menorPorcentaje);
}

//------FUNZIONE EVENTO MAGGIOR CAPACITÀ -----

function mayorCapacidad() {
    let arrayMayor = [];
    arrayMayor.push(...arrayDato);

    arrayMayor.sort((a, b) => b.capacity - a.capacity);
    mayor_Capacidad = arrayMayor[0];
    console.log(mayor_Capacidad);

}
//----------------------//



//-------funzione ingresso per categoria ------//

function ingressoCategoria() {
    let arrayCategoria = [];
    arrayCategoria.push(...arrayDato);

    let unicos = arrayCategoria.map((evento) => evento.category);

    arrayCategorias = new Set(unicos);
    let categorias = [...arrayCategorias];
    let ingresos = [];
    arrayCategoria.map((evento) => {

        evento.ingresos = evento.assistance * evento.price || evento.estimate * evento.price

    });

    console.log(arrayCategoria);

    categorias.forEach((categoria) => {



        let newObject = {};
        let array = arrayCategoria.filter(
            (evento) => evento.category == categoria


        );

        let total = 0;
        array.forEach((val) => {
            total += val.ingresos
        });
        newObject = {
            nombre: categoria,
            ingresos: total,

        };


        ingresos.push(newObject);
        console.log(newObject);
        console.log(ingresos);
    });
    console.table(ingresos);
    ingresoCategoria.push(...ingresos)
    console.log(ingresoCategoria);
    console.log(ingresos);

}

//---------------------------//


//-----------FUNZIONE PERCENTUALE ASSISTENZA PER CATEGORIA-----------------
function porcentajeAsistencia_Categoria() {

    let arrayCategoria = [];
    arrayCategoria.push(...arrayDato);

    let categorias = [...arrayCategorias];

    let asistencia = [];

    arrayCategoria.map((evento) => {
        evento.porcentajeAsistencia = (evento.assistance * 100) / (evento.capacity);
    });

    categorias.forEach((categoria) => {
        let newObject = {};
        let array = arrayCategoria.filter(
            (evento) => evento.category == categoria && evento.date < fechaActual
        );

        let total = 0;
        array.forEach((val) => {
            total += val.porcentajeAsistencia
        });


        total = total / array.length;

        newObject = {
            categoria: categoria,
            porcentaje: Number(total.toFixed(2)),

        };
        asistencia.push(newObject);


    });

    console.table(asistencia);
    porcentajeAsistenciaCategoria.push(...asistencia);


}















