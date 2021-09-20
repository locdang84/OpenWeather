/// <reference types="cypress" />
import Header from '../../../support/page-object/header-object'

describe('01.Home page - search city', () => {

    let header = new Header()
    let cityTestData

    before(() => {
        cy.visit(Cypress.env('homePageURL'))
        cy.fixture('city-test-data').then((data) => {
            cityTestData = data
        })
    })

    it('Redirect to correct page afer searching', () => {
        // Check main logo exists
        header.getMainLogo().should('exist')

        // Check search city input visible and input query
        header.getDesktopSearchInput().should('be.visible').type(`${cityTestData.main.cityQuery}{enter}`)

        /* AFTER NAVIGATING */

        // Check navigate to right page
        cy.url().should('include', cityTestData.main.cityQuery.replace(' ', '+'))
    })
})