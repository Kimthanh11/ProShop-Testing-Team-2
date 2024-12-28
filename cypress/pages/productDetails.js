export const productDetails = {
    BTN_ADD: 'button[type="button"].btn-block.btn.btn-primary',
    DDL_QTY: 'select.form-control',
    INPUT_RATING: '#rating',
    INPUT_COMMENT: '#comment',
    BTN_REVIEW: 'button[type="submit"].btn.btn-primary',
    
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
    },

    reviewProduct(){
        let comment = "Very good product";
        cy.get(this.INPUT_RATING).select('5');
        cy.get(this.INPUT_COMMENT).type(comment);
        cy.get(this.BTN_REVIEW).first().click();
    },

    verifyReview(name) {
        cy.get('.Toastify__toast-body').should('have.text', 'Review created successfully');
    }
}