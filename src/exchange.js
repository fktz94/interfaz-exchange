/// <reference types="jquery" />

const fechaMaximaAElegir = document.getElementById("calendario");
fechaMaximaAElegir.max = new Date().toISOString().split("T")[0];

//

const $fecha = $("#fecha");
const $boton = $("#hoy");
