class Header {
    #img_mainLogoLocator = 'li.logo img'
    #input_desktopSearchInputLocator = '#desktop-menu input[name=q]'
    #input_mobileSearchInputLocator = '#mobile-menu input[name=q]'

    getMainLogo() {
        return cy.get(this.#img_mainLogoLocator)
    }
    getDesktopSearchInput(){
        return cy.get(this.#input_desktopSearchInputLocator, {timeout: 10000})
    }
    getMobileSearchInput(){
        return cy.get(this.#input_mobileSearchInputLocator, {timeout: 10000})
    }
}
export default Header