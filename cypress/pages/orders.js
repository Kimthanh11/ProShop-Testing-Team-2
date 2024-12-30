export const orders = {
    BTN_DETAILS: "a.btn-sm.btn.btn-light",

    navigateToOneSpecificOrder(username) {
        cy.contains(this.BTN_DETAILS, 'Details').click();
    },
    
}
