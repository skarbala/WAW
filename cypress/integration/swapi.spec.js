/// <reference types="Cypress" />

it('should return info about Luke', () => {
    cy.request('https://swapi.dev/api/people/1')
        .then(response => {
            expect(response.body.name).to.equal('Luke Skywalker')
            expect(response.body.gender).to.equal('male')
            expect(response.body.mass).to.equal('77')
            expect(response.body.starships).to.have.length(2)
            expect(response.status).to.equal(200)
        })
})