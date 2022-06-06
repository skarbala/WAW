
beforeEach(() => {
    cy.visit('/gosslingator.php')
})

it('should add one ryan', () => {
    //2. najdem tlacidlo add ryan
    //3. kliknem na tlacidlo add ryan
    cy.get('#addRyan').click()
    //4. overim text 1 ryan
    cy.get('#ryanCounter').should('have.text', '1')
    cy.get('.ryan-counter h3').should('have.text', 'ryan')
    cy.get('img').should('be.visible')
})

it('should add two ryans', () => {
    //2. najdem tlacidlo add ryan
    //3. kliknem na tlacidlo add ryan
    cy.get('#addRyan').click()
    cy.get('#addRyan').click()
    //4. overim text 1 ryan
    cy.get('#ryanCounter').should('have.text', '2')
    cy.get('img').should('have.length', '2')
})
//should display 0 ryans on page open
it('should display 0 ryans on page open', () => {
    cy.get('#ryanCounter').should('have.text', '0')
    cy.get('.ryan-counter h3').should('have.text', 'ryans')
    cy.get('img')
        .should('have.length', '0')
        .should('not.exist')
})
//
//should disable remove ryan button on page open
it('should display correct text on remove ryan button', () => {
    cy.get('#removeRyan').should('contain.text', 'Ryan out!')
})

it('should disable remove ryan button on page open', () => {
    cy.get('#removeRyan').should('be.disabled')
})

it.only('should display warning message when ryans is 50', () => {
    cy.get('#addRyan').as('addRyanButton')
    for (let index = 0; index < 50; index++) {
        cy.get('@addRyanButton').click()
    }

});

