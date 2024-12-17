export const productDetails = {
    BTN_ADD: 'button[type="button"].btn-block.btn.btn-primary',
    
    addToCart() {
        cy.get(this.BTN_ADD).click()
        return this
    }
}