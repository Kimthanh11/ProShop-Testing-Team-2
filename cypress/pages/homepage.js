export const homePage = {
    TXT_USERNAME: "#username",
    BTN_SEARCH: 'input[placeholder="Search Products..."]',
    
    checkDirectToHomePage(username){
        cy.get(this.TXT_USERNAME).should('have.text', username)
    },

    searchProduct(product){
        cy.get(this.BTN_SEARCH).click().type(product)
        cy.get('button[type="submit"]').click();
        return this
    },

    checkProductAppearedAfterSearch(product){
        cy.get(".product-title").should('have.text', product)
        return this
    },

    selectOneProduct(product){
        cy.get(".product-title").click()
        return this
    }
}