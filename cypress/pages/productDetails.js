export const productDetails = {
    BTN_ADD: 'button[type="button"].btn-block.btn.btn-primary',
    DDL_QTY: 'select.form-control',
    
    addToCart() {
        cy.get(this.BTN_ADD).click()
        return this
    },

    disableAddToCart(){
        cy.get(this.BTN_ADD).should('be.disabled')
    },

    checkLimitQuantity(limit) {
        cy.get(this.DDL_QTY).first()
        .within(() => {
            cy.get('option').should('have.length', limit);})
    }
}