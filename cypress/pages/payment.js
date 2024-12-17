export const payment = {
    BTN_CONTINUE: '.btn.btn-primary',
    
    pay() {
        cy.get(this.BTN_CONTINUE).click()
        return this
    }
}