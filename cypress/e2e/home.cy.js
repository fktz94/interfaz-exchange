/// <reference types="Cypress" >

const LINK = "http://127.0.0.1:8080";

//

const monedas = fetch("https://api.frankfurter.app/currencies")
  .then((respuesta) => respuesta.json())
  .then((respuesta) => Object.keys(respuesta).length);

console.log(monedas);

//

describe("home", () => {
  beforeEach(() => {
    cy.visit(LINK);
  });

  it("contiene titulo", () => {
    cy.getByData("titulo").contains("Bienvenido a ¿Cuánto cotiza?");
  });

  it("contiene subtitulo", () => {
    cy.getByData("subtitulo").contains(
      "La interfaz que te permite comparar divisas con precios actualizados e históricos"
    );
  });

  it("se asegura que cargue todas las divisas", () => {
    cy.getByData("menu-selector-divisas")
      .find("option")
      .should("have.length", monedas);
  });
});
