class CityListPage {
    #input_citySearchInputLocator = '#search_str'
    #button_searchLocator = 'Search'
    #tr_cityLocator = '#forecast_list_ul > table > tbody > tr'
    #div_notFound = 'Not found'

    getCitySearchInput() {
        return cy.get(this.#input_citySearchInputLocator)
    }
    getSearchButton() {
        return cy.contains(this.#button_searchLocator)
    }
    getCities(){
        return cy.get(this.#tr_cityLocator)
    }
    getWeatherImage(n){
        return cy.get(this.#tr_cityLocator).eq(n).find('td').first().find('img')
    }
    getCityName(n){
        return cy.get(this.#tr_cityLocator).eq(n).find('td').last().find('a').first()
    }
    getTemperature(n){
        return cy.get(this.#tr_cityLocator).eq(n).find('.badge-info')
    }

    getNotFound(n){
        return cy.contains(this.#div_notFound)
    }
}
export default CityListPage