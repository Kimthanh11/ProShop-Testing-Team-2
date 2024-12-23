export const payment = {
    BTN_CONTINUE: '.btn.btn-primary',
    TXT_HEADING: 'h1',
    
    checkDirectToPayment(){
        cy.get(this.TXT_HEADING).should('have.text', 'Payment Method')
    },

    pay() {
        cy.get(this.BTN_CONTINUE).click()
        return this
    }
}