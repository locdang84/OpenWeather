/// <reference types="cypress" />
import CityListPage from '../../../support/page-object/city-list-page-object'

describe('02.List city page - display result', () => {

    let cityListPage = new CityListPage()
    let cityTestData

    before(() => {
        cy.fixture('city-test-data').then((data) => {
            cityTestData = data
        })
    })

    it('Main case - Found one city', () => {
        // Intercept to check if search city API was called
        const cityQueryEncode = cityTestData.main.cityQuery.replace(' ', '%20')
        cy.intercept(
            {
                method: 'GET',
                url: `${Cypress.env('getCityListAPI_UI')}*&q=${cityQueryEncode}*`,
            }
        ).as('getCityList') // assign an alias 

        // Go directly to searching page with query
        cy.visit(`${Cypress.env('homePageURL')}find?q=${cityTestData.main.cityQuery.replace(' ', '+')}`)

        // Check search input and search log exist on search page
        cityListPage.getCitySearchInput().should('exist')
        cityListPage.getSearchButton().should('exist')

        // Search city API was called
        cy.wait('@getCityList', {timeout: 10000}).then((interception) => {
            console.log(interception)
            assert.isNotNull(interception.response.body, 'API was called')
        })

        // Check number of city returned
        cityListPage.getCities().should('have.length', cityTestData.main.expectedResultLength)

        // Check weather img, city name, temperatrue exits and click on the link
        cityListPage.getWeatherImage(0).should('exist')
        cityListPage.getTemperature(0).should('exist')
        cityListPage.getCityName(0).should('have.text', ` ${cityTestData.main.cityQuery}, ${cityTestData.main.countryISO}`).click()

        /* AFTER NAVIGATING */

        // Check navigate to right page
        cy.url().should('include', `city/${cityTestData.main.cityId}`)
    })

    it('Found multiple cities', () => {
        /* The main test case had checked it all, this case we only check number of city returend */

        // Go directly to searching page with query
        cy.visit(`${Cypress.env('homePageURL')}find?q=${cityTestData.multipleResult.cityQuery.replace(' ', '+')}`)

        // Check number of city returned
        cityListPage.getCities().should('have.length', cityTestData.multipleResult.expectedResultLength)
    })

    it('Found no city', () => {
        /* The main test case had checked it all, this case we only check number of city returend */

        // Go directly to searching page with query
        cy.visit(`${Cypress.env('homePageURL')}find?q=${cityTestData.emptyResult.cityQuery.replace(' ', '+')}`)

        // Check number of city returned
        cityListPage.getCities().should('have.length', cityTestData.emptyResult.expectedResultLength)
        cityListPage.getNotFound().should('exist')
    })
})