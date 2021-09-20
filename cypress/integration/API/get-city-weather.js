/// <reference types="cypress" />

describe('API - Get Citys Weather', () => {
    let cityTestData

    // Get test data first
    before(() => {
        cy.fixture('city-test-data').then((data) => {
            cityTestData = data
        })
    })

    // Sub test suit - API for getting city list
    context('Get City List - https://openweathermap.org/data/2.5/find', () => {

        it('Main case - Ha Noi', () => {   
            // Run the request
            cy.request({ 
                method: 'GET', 
                url: `${Cypress.env('getCityListAPI')}&q=${cityTestData.main.cityQuery}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .should((response) => {
                
                /*--- Status = 200 and isSuccess = true ---*/
                expect(response.status).to.equal(200)

                // get data 
                let data = response.body

                /*--- Check general data ---*/
                expect(data.count).to.eql(cityTestData.main.expectedResultLength)
                expect(data.list).to.have.lengthOf(cityTestData.main.expectedResultLength)
                expect(data.list[0].id).that.is.a('number').to.eql(cityTestData.main.cityId)
                expect(data.list[0].name.toLowerCase()).that.is.a('string').to.eql(cityTestData.main.cityQuery.toLowerCase())
                expect(data.list[0].coord).to.exist
                expect(data.list[0].main.temp).that.is.a('number').to.exist
                expect(data.list[0].weather).to.exist
            })             
        })

        it('Multipe Result - Manchester', () => {   
            /* The main test case had checked it all, this case we only check number of city returend */
            cy.request({ 
                method: 'GET', 
                url: `${Cypress.env('getCityListAPI')}&q=${cityTestData.multipleResult.cityQuery}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .should((response) => {
                
                /*--- Status = 200 and isSuccess = true ---*/
                expect(response.status).to.equal(200)

                // get data 
                let data = response.body

                /*--- Check general data ---*/
                expect(data.count).to.eql(cityTestData.multipleResult.expectedResultLength)
                expect(data.list).to.have.lengthOf(cityTestData.multipleResult.expectedResultLength)
            })             
        })

        it('With Country ISO code - Manchester, GB', () => {   
            /* The main test case had checked it all, this case we only check number of city returend */
            cy.request({ 
                method: 'GET', 
                url: `${Cypress.env('getCityListAPI')}&q=${cityTestData.countryISOQuery.cityQuery}, ${cityTestData.countryISOQuery.countryISO}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .should((response) => {
                
                /*--- Status = 200 and isSuccess = true ---*/
                expect(response.status).to.equal(200)

                // get data 
                let data = response.body

                /*--- Check general data ---*/
                expect(data.count).to.eql(cityTestData.countryISOQuery.expectedResultLength)
                expect(data.list).to.have.lengthOf(cityTestData.countryISOQuery.expectedResultLength)
            })             
        })

        it('Empty Result - no city', () => {   
            /* The main test case had checked it all, this case we only check number of city returend */
            cy.request({ 
                method: 'GET', 
                url: `${Cypress.env('getCityListAPI')}&q=${cityTestData.emptyResult.cityQuery}, ${cityTestData.emptyResult.countryISO}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .should((response) => {
                
                /*--- Status = 200 and isSuccess = true ---*/
                expect(response.status).to.equal(200)

                // get data 
                let data = response.body

                /*--- Check general data ---*/
                expect(data.count).to.eql(cityTestData.emptyResult.expectedResultLength)
                expect(data.list).to.have.lengthOf(cityTestData.emptyResult.expectedResultLength)
            })             
        })
    })

    // Sub test suit - API for getting full weather based on lat, long
    context('Get City Full Weather - https://openweathermap.org/data/2.5/weather', () => {
        it('Main case - Ha Noi', () => {   
            // Run the request
            cy.request({ 
                method: 'GET', 
                url: `${Cypress.env('getCityFullWeather')}&id=${cityTestData.main.cityId}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .should((response) => {
                
                /*--- Status = 200 and isSuccess = true ---*/
                expect(response.status).to.equal(200)

                // get data 
                let data = response.body

                /*--- Check general data ---*/
                expect(data.name.toLowerCase()).that.is.a('string').to.eql((cityTestData.main.cityQuery.replace(' ', '')).toLowerCase())
                expect(data.coord).to.exist
                expect(data.weather).to.exist
                expect(data.main.temp).that.is.a('number').to.exist
            })             
        })
    })
})