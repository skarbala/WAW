/// <reference types="Cypress" />

it('should display price on result page', () => {
    cy.intercept('**/graphql?featureName=SearchReturnItinerariesQuery')
        .as('results')
    window.localStorage.setItem('bookingcom_extension_default', false)
    cy.setCookie('__kwc_agreed', 'true')
    cy.visit('https://www.kiwi.com/en')

    cy.get('[data-test="PlacePickerInput-destination"]')
        .find('[data-test="SearchField-input"]')
        .type('Tokyo')

    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .should('be.visible')
        .contains('Tokyo')
        .click()

    cy.get('[data-test="LandingSearchButton"]').click()
    cy.wait('@results')
    cy.get('[data-test="ResultCardWrapper"]')
        .should('be.visible')
        .find('[data-test="ResultCardPrice"]')
        .should('not.be.empty')
})

it('should display total price on booking page', () => {
    cy.setCookie('__kwc_agreed', 'true')
    cy.request({
        url: 'https://api.skypicker.com/flights',
        qs: {
            partner: 'cypress',
            fly_from: 'VIE',
            fly_to: 'LAX'
        }
    }).then(response => {
        const foundFlights = response.body.data
        const flight = foundFlights[0]
        cy.visit('https://kiwi.com/sk/booking?token=' + flight.booking_token)
    })
    cy.get('.ReservationBill-item-price', { timeout: 15000 })
        .should('be.visible')
        .and('not.be.empty')
});