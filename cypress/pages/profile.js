export const profile = {
    TXT_HEADING:"h2",
    checkDirectToProfile(){
        cy.get(this.TXT_HEADING).first().should("have.text", "User Profile")
    },

    navigateToDetailedOrder(orderId) {
        // Construct the link dynamically using the orderId
        cy.get(`a[href="/order/${orderId}"]`).click();  // Find the Details link with the specific order ID and click it
    }
}