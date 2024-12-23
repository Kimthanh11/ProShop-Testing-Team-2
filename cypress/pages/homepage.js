export const homePage = {
    TXT_USERNAME: "#username",
    INPUT_SEARCH: 'input[placeholder="Search Products..."]',
    BTN_SEARCH: 'button[type="submit"][placeholder="Search"]',
    BTN_CART: ".badge.rounded-pill.bg-success",
    BTN_PROFILE: 'a.dropdown-item[href="/profile"]',

    checkDirectToHomePage(username) {
        cy.get(this.TXT_USERNAME).should('have.text', username);
    },

    searchProduct(product) {
        cy.get(this.INPUT_SEARCH).click().type(product);
        cy.get(this.BTN_SEARCH).click();
        return this;
    },

    checkProductAppearedAfterSearch(product) {
        cy.get(".product-title").should('have.text', product);
        return this;
    },

    checkNumberOfProductsInCart(number) {
        cy.get(this.BTN_CART).should('have.text', number);
        return this;
    },

    navigateToProfile() {
        cy.get(this.TXT_USERNAME)
            .click({ force: true });
        return this;
    }
}
