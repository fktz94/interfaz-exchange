/// <reference types="cypress" >

const LINK = "http://127.0.0.1:8080";

describe("home", () => {
  it("contiene titulo", () => {
    cy.visit(LINK);
    cy.get("h1").contains("Bienvenido a ¿Cuánto cotiza?");
  });
});
