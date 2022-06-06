/// <reference types="cypress" />

it('should calculate interest income', () => {
    //1. otvorim stranku
    cy.visit('/savingscalculator.php')
    //2. vyberiem fond
    cy.get('#fundSelect').select('Fellowship investment group')
    //3. zadam sumu investicie
    cy.get('#oneTimeInvestmentInput').type('15000')
    //4. zadam pocet rokov
    cy.get('#yearsInput').type('10')
    //5. kliknem na calculate
    cy.get('[data-test=calculate]').click()
    //6. overim ze interest income nie je prazdny a obsahuje menu "kr"
    cy.get('div.result')
        .find('div')
        .eq(1)
        .find('p')
        .should('not.be.empty')
        .should('contain.text', 'kr')
})


it('should display email in request detail', () => {
    const savingsData = {
        fund: 'Fellowship investment group',
        years: 10,
        investment: 25000000000,
        email: 'matko@kubko.sk',
        heroes: ['Frodo', 'Gandalf', 'Gimli']
    }
    cy.visit('/savingscalculator.php')
    cy.get('#fundSelect').select(savingsData.fund)
    cy.get('#oneTimeInvestmentInput').type(savingsData.investment)
    cy.get('#yearsInput').type(savingsData.years)
    cy.get('#emailInput').type(savingsData.email)

    cy.get('[data-test=apply-for-saving]').click()
    cy.get('ul.saving-list')
        .find('li')
        .eq(0)
        .contains('detail')
        .click()

    cy.contains('Contact')
        .find('span')
        .should('have.text', savingsData.email)
})
