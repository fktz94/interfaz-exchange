/// <reference types="Cypress" />

const LINK = 'http://127.0.0.1:8080';

describe('home', () => {
  beforeEach(() => {
    cy.visit(LINK);
  });

  it('contiene titulo', () => {
    cy.getByData('titulo').contains('Bienvenido a ¿Cuánto cotiza?');
  });

  it('contiene subtitulo', () => {
    cy.getByData('subtitulo').contains(
      'La interfaz que te permite comparar divisas con precios actualizados e históricos',
    );
  });

  it('se asegura que cargue todas las divisas', () => {
    cy.getByData('menu-selector-divisas')
      .find('option')
      .should('have.length', 31);
  });

  it('se asegura que devuelva los valores actuales', () => {
    cy.getByData('menu-selector-divisas')
      .select(Math.floor(Math.random() * 31))
      .getByData('valor-hoy')
      .click()
      .getByData('titulo-tablero')
      .should('be.visible')
      .getByData('lista-de-conversiones-1')
      .should('be.visible')
      .get('li')
      .should('have.length', 15)
      .getByData('lista-de-conversiones-2')
      .should('be.visible')
      .get('li')
      .should('have.length', 15);
  });

  it('se asegura que devuelva los valores por calendario', () => {
    cy.getByData('menu-selector-divisas')
      .select(Math.floor(Math.random() * 31))
      .getByData('calendario')
      .type('2019-01-05')
      .getByData('buscar-por-fecha')
      .click()
      .getByData('titulo-tablero')
      .should('be.visible')
      .getByData('lista-de-conversiones-1')
      .should('be.visible')
      .get('li')
      .should('have.length', 15)
      .getByData('lista-de-conversiones-2')
      .should('be.visible')
      .get('li')
      .should('have.length', 15);
  });

  it('se asegura que devuelva error por una fecha invalida', () => {
    cy.getByData('menu-selector-divisas')
      .select(Math.floor(Math.random() * 31))
      .getByData('calendario')
      .type('1900-01-05')
      .getByData('buscar-por-fecha')
      .click()
      .getByData('calendario')
      .should('have.class', 'error')
      .getByData('titulo-tablero')
      .should('not.be.visible')
      .getByData('lista-de-conversiones-1')
      .should('not.be.visible')
      .getByData('lista-de-conversiones-2')
      .should('not.be.visible');
  });

  it('se asegura que devuelva error por una fecha vacía', () => {
    cy.getByData('menu-selector-divisas')
      .select(Math.floor(Math.random() * 31))
      .getByData('calendario')
      .getByData('buscar-por-fecha')
      .click()
      .getByData('calendario')
      .should('have.class', 'error')
      .getByData('titulo-tablero')
      .should('not.be.visible')
      .getByData('lista-de-conversiones-1')
      .should('not.be.visible')
      .getByData('lista-de-conversiones-2')
      .should('not.be.visible');
  });

  it('se asegura que muestre las referencias', () => {
    cy.getByData('referencias').get('strong').should('have.length', 31);
  });

  it('se asegura que el link referencias funcione', () => {
    cy.getByData('ir-a-referencias').click();
    cy.url().should('include', '/#referencias');
  });
});
