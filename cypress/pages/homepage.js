export const homePage = {
    TXT_USERNAME: "#username",
    INPUT_SEARCH: 'input[placeholder="Search Products..."]',
    BTN_SEARCH: 'button[type="submit"][placeholder="Search"]',
    BTN_CART: ".badge.rounded-pill.bg-success",
    BTN_PROFILE: '[href="/profile"]',
    BTN_ADMIN: "#adminmenu",
    BTN_PRODUCT: 'a.dropdown-item[href="/admin/productlist"]',
    BTN_ORDER: 'a.dropdown-item[href="/admin/orderlist"]',
    BTN_USER: 'a.dropdown-item[href="/admin/userlist"]',
    BTN_CART: 'a[href="/cart"]',
    BTN_LOGOUT: ".dropdown-menu > [role='button']",
    BTN_CLOSE_TOAST: ".Toastify__close-button",

    checkDirectToHomePage(username) {
        cy.get(this.TXT_USERNAME).should('have.text', username);
    },

    searchProduct(product) {
        cy.get(this.INPUT_SEARCH).click().type(product).type('{enter}');
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
        cy.get('#basic-navbar-nav').within(() => {
            cy.get(this.TXT_USERNAME).click();
        });
        cy.get(this.BTN_PROFILE, { timeout: 10000 })
          .should('be.visible')
          .click();
        return this;
    },

    navigateAdminProducts(){
        cy.get(this.BTN_ADMIN).click()
        cy.get(this.BTN_PRODUCT).click();
        return this
    },

    navigateAdminOrders(){
        cy.get(this.BTN_ADMIN).click()
        cy.get(this.BTN_ORDER).click();
        return this
    },

    navigateToCart(){
        cy.get(this.BTN_CART).click()
        return this
    },

    selectProduct(productName) {
        cy.contains('.product-title.card-title', productName).click()
        return this;
    },

    logout() {
        cy.get(this.TXT_USERNAME).click();
        cy.get(this.BTN_LOGOUT).click();
    }
}
