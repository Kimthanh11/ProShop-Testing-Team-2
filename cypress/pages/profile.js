export const profile = {
    TXT_HEADING:"h2",
    INPUT_PASSWORD: '#password',
    INPUT_CONFIRM_PASSWORD: '#confirmPassword',
    BTN_UPDATE: '.col-md-3 > form > .btn',
    INPUT_NAME: '#name',

    checkDirectToProfile(){
        cy.get(this.TXT_HEADING).first().should("have.text", "User Profile")
    },

    navigateToDetailedOrder(orderId) {
        // Construct the link dynamically using the orderId
        cy.get(`a[href="/order/${orderId}"]`).click();  // Find the Details link with the specific order ID and click it
    },

    updateNameAndPassword(){
        cy.get(this.INPUT_NAME).clear().type("Demo User")
        cy.get(this.INPUT_PASSWORD).clear().type('123456');
        cy.get(this.INPUT_CONFIRM_PASSWORD).clear().type('123456');
        cy.get(this.BTN_UPDATE).click();
    },

    checkOrderDetails(){
        cy.get(this.TXT_HEADING).first().should("have.text", "Order Details")
    }
}