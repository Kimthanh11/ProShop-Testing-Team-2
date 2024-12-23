export const shoppingCart = {
    BTN_CHECKOUT: 'button[type="button"].btn-block.btn.btn-primary',
    TXT_EMPTYSTOCK:'div[role="alert"].alert-info',
    
    proceedToCheckout() {
        cy.get(this.BTN_CHECKOUT).click()
        return this
    },

    removeProduct(productName) {
        cy.contains('.row', productName) // Locate the row containing the product name
            .find('button.btn-light') // Find the button element inside that row
            .click(); // Click the button
    },
    
    verifyCartEmpty(){
        cy.get(this.TXT_EMPTYSTOCK).should('contain.text', 'Your cart is empty');
    }
}