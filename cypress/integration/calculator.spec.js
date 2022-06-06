/// <reference types="Cypress" />
beforeEach(() => {
    cy.visit('http://ajtyvit-app.westeurope.cloudapp.azure.com:8080/kalkulacka.php')
})
it('should count two positive numbers', () => {
    cy.get('#firstInput').type('2')
    cy.get('#secondInput').type('3')
    cy.get('#count').click()
    cy.get('#result').should('have.text', '5')

});

it.only('should reset the calculator', () => {
    cy.get('#firstInput').type('2')
    cy.get('#secondInput').type('3')
    cy.get('#count').click()

    cy.get('#reset').click()

    cy.get('#result').should('have.text', '')
    cy.get('#firstInput')
        .should('have.value', '')
        .should('have.attr', 'placeholder', 'prve cislo')
    cy.get('#secondInput').should('have.value', '')
})

it('should display latest results after sum', () => {
    cy.get('#firstInput').type('2')
    cy.get('#secondInput').type('3')
    cy.get('#count').click()

    cy.get('ul.latest-results')
        .find('li')
        .should('have.length', 1)
})