
const lote = document.getElementById("loteVacuna");
const temperatura = document.getElementById("tempActual");
const btn = document.getElementById("btnRegistrarTemp");
const grid = document.getElementById("gridLecturas");

//Clase para guardar los datos de cada lectura
class LecturaBiologica {

    constructor(lote, temperatura, estado) {
        this.lote = lote;
        this.temperatura = temperatura;
        this.estado = estado;
    }

}

//Registrar una nueva lectura
btn.addEventListener("click", registrarLectura);

//Cargar lecturas al iniciar la pagina
document.addEventListener("DOMContentLoaded", cargarLecturas);

//Funcion para registrar la temperatura
function registrarLectura() {

    const nombreLote = lote.value.trim();
    const temp = temperatura.value;

    if(nombreLote === "" || temp === ""){
        return alert("Completa todos los campos");
    }

    //Convertir la temperatura a numero
    
    const tempActual = parseFloat(temp);

    //Revisar si la temperatura esta dentro del rango
    let estado;

    if(tempActual < 2 || tempActual > 8){
        estado = "COMPROMETIDO";
    } else {
        estado = "OPTIMO";
    }

    //Crear una nueva lectura
    const nuevaLectura = new LecturaBiologica(nombreLote, tempActual, estado);

    //Obtener las lecturas guardadas
    const lecturas = obtenerLecturas();

    //Agregar la nueva lectura
    lecturas.push(nuevaLectura);

    //Guardar en localStorage
    localStorage.setItem("lecturas", JSON.stringify(lecturas));

    //Mostrar las lecturas
    mostrarLecturas();

    //Limpiar los campos
    lote.value = "";
    temperatura.value = "";

}

//Obtener lecturas usando localStorage
function obtenerLecturas(){

    return JSON.parse(localStorage.getItem("lecturas")) || [];

}

//Mostrar las lecturas en pantalla
function mostrarLecturas(){

    const lecturas = obtenerLecturas();

    grid.innerHTML = "";

    lecturas.forEach((lectura) => {

        //Crear una tarjeta
        const columna = document.createElement("div");
        columna.className = "col-md-6 mb-3";

        const tarjeta = document.createElement("div");
        tarjeta.className = "card p-3 shadow-sm h-100";

        //Revisar el estado para cambiar el color
        if(lectura.estado === "COMPROMETIDO"){
            tarjeta.classList.add("border-danger", "border-2");
        } else {
            tarjeta.classList.add("border-success", "border-2");
        }

        //Mostrar los datos de la lectura
        const titulo = document.createElement("h5");
        titulo.textContent = "Lote: " + lectura.lote;

        const temp = document.createElement("p");
        temp.textContent = "Temperatura: " + lectura.temperatura + " °C";

        const estado = document.createElement("h6");
        estado.textContent = lectura.estado;

        //Cambiar el color del texto
        if(lectura.estado === "COMPROMETIDO"){
            estado.className = "text-danger";
        } else {
            estado.className = "text-success";
        }

        //Agregar los elementos a la tarjeta
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(temp);
        tarjeta.appendChild(estado);

        columna.appendChild(tarjeta);
        grid.appendChild(columna);

    });

}

//Cargar las lecturas guardadas
function cargarLecturas(){

    mostrarLecturas();

}
