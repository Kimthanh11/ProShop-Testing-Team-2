export const shoppingCart = {
    BTN_CHECKOUT: 'button[type="button"].btn-block.btn.btn-primary',
    
    proceedToCheckout() {
        cy.get(this.BTN_CHECKOUT).click()
        return this
    }
}