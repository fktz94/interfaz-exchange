/// <reference types="Cypress" />

const LINK = 'http://127.0.0.1:8080';

describe('testeo con mock', () => {
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
    cy.intercept('https://api.frankfurter.app/currencies', {
      fixture: 'currencies.json',
    }).as('obtenerCurrencies');

    cy.getByData('menu-selector-divisas')
      .find('option')
      .should('have.length', 31);
  });

  it('se asegura que devuelva los valores actuales', () => {
    cy.intercept('https://api.frankfurter.app/latest?from=EUR', {
      fixture: 'latest.json',
    }).as('obtenerValorDeHoy');

    cy.getByData('menu-selector-divisas')
      .select(8)
      .getByData('valor-hoy')
      .click()
      .getByData('titulo-tablero')
      .should('be.visible')
      .getByData('lista-de-conversiones')
      .should('be.visible')
      .get('li')
      .should('have.length', 30);
  });

  it('se asegura que devuelva los valores por calendario', () => {
    cy.intercept('https://api.frankfurter.app/2019-01-05?from=BRL', {
      fixture: 'calendario',
    }).as('obtenerValorPorCalendario');

    cy.getByData('menu-selector-divisas')
      .select(2)
      .getByData('calendario')
      .type('2019-01-05')
      .getByData('buscar-por-fecha')
      .click()
      .getByData('titulo-tablero')
      .should('be.visible')
      .getByData('lista-de-conversiones')
      .should('be.visible')
      .get('li');
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
      .getByData('lista-de-conversiones')
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
      .getByData('lista-de-conversiones')
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
