class FullWeatherPage {
    #span_currentDateTimeLocator = '.section-content .current-container span.orange-text'
    #svg_cityWeather = '.current-temp .owm-weather-icon'
    #span_cityTemparatureLocator = '.current-temp .heading'

    getCurrentDateTime() {
        return cy.get(this.#span_currentDateTimeLocator)
    }
    getCity() {
        return cy.get(this.#span_currentDateTimeLocator).next()
    }
    getCityWeather(){
        return cy.get(this.#svg_cityWeather)
    }
    getCityTemperature(){
        return cy.get(this.#span_cityTemparatureLocator)
    }
}
export default FullWeatherPage