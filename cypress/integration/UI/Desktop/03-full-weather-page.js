/// <reference types="cypress" />
import FullWeatherPage from '../../../support/page-object/full-weather-page-object'

describe('03.Full weather apge - display result', () => {

    let fullWeatherPage = new FullWeatherPage()
    let cityTestData

    before(() => {
        cy.fixture('city-test-data').then((data) => {
            cityTestData = data
        })
    })

    it('Main case - Display correct data', () => {
        // Intercept to check if get full weather API was called
        cy.intercept(
            {
                method: 'GET',
                url: `${Cypress.env('getCityFullWeather_UI')}id=${cityTestData.main.cityId}*`,
            }
        ).as('getFullWeather') // assign an alias 

        // Go directly to full weather page with query
        cy.visit(`${Cypress.env('homePageURL')}city/${cityTestData.main.cityId}`)

        // Get full weather API was called
        cy.wait('@getFullWeather', {timeout: 10000}).then((interception) => {
            console.log(interception)
            assert.isNotNull(interception.response.body, 'API was called')
        })

        // Check current date time, city name, city weather and city temperature
        const currentDate = new Date().toString()
        fullWeatherPage.getCurrentDateTime().should('include.text', currentDate.substring(4,10)).invoke('css', 'color').should('equal', 'rgb(235, 110, 75)')
        fullWeatherPage.getCity().should(($h2) => {
            const text = $h2.text()
          
            expect(text.toLowerCase()).to.eql(`${cityTestData.main.cityQuery.replace(' ', '')}, ${cityTestData.main.countryISO}`.toLowerCase())
        })
        fullWeatherPage.getCityWeather().should('exist')
        fullWeatherPage.getCityTemperature().should('exist')
    })
})