/// <reference types="jquery" />

// ¿Por qué entre moneda y moneda se genera una option vacía?

function vaciarOptionsVacias() {
  const $divisas = $('#menu-selector-divisas option');
  $divisas.each((i, divisa) => {
    if (divisa.innerText.length === 0) {
      divisa.remove();
    }
  });
}

// crear la class Moneda

function listarReferencias(monedas) {
  Object.keys(monedas).forEach((moneda) => {
    $('#referencias span').append(
      ` <strong class="text-lg">${moneda}:</strong> ${monedas[moneda]}; `,
    );
  });
}

export default function listarMonedas(monedas) {
  const $selector = $('#menu-selector-divisas');
  Object.keys(monedas).forEach((moneda) => {
    $selector.append(
      $(`<option value="${moneda}">${monedas[moneda]}<option/>`),
    );
  });
  listarReferencias(monedas);
  vaciarOptionsVacias();
}
