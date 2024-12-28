export const profile = {
    TXT_HEADING:"h2",
    INPUT_PASSWORD: '#password',
    INPUT_CONFIRM_PASSWORD: '#confirmPassword',
    BTN_UPDATE: '.col-md-3 > form > .btn',
    INPUT_NAME: '#name',
    INPUT_EMAIL: '#email',

    checkDirectToProfile(){
        cy.get(this.TXT_HEADING).first().should("have.text", "User Profile")
    },

    navigateToDetailedOrder(orderId) {
        // Construct the link dynamically using the orderId
        cy.get(`a[href="/order/${orderId}"]`).click();  // Find the Details link with the specific order ID and click it
    },

    updateNameAndPassword(newName, password){
        cy.get(this.INPUT_NAME).clear().type(newName)
        cy.get(this.INPUT_PASSWORD).clear().type(password);
        cy.get(this.INPUT_CONFIRM_PASSWORD).clear().type(password);
        cy.get(this.BTN_UPDATE).click();
    },

    updateNamePasswordEmail(newName, password, email){
        cy.get(this.INPUT_NAME).clear().type(newName)
        cy.get(this.INPUT_PASSWORD).clear().type(password);
        cy.get(this.INPUT_CONFIRM_PASSWORD).clear().type(password);
        cy.get(this.INPUT_EMAIL).clear().type(email);
        cy.get(this.BTN_UPDATE).click();
    },

    updateName(newName) {
        cy.get(this.INPUT_NAME).clear().type(newName);
        cy.get(this.BTN_UPDATE).click();
    },

    updatePassword(newPassword) {
        cy.get(this.INPUT_PASSWORD).clear().type(newPassword);
        cy.get(this.INPUT_CONFIRM_PASSWORD).clear().type(newPassword);
        cy.get(this.BTN_UPDATE).click();
    },

    updateEmail(newEmail) {
        cy.get(this.INPUT_EMAIL).clear().type(newEmail);
        cy.get(this.BTN_UPDATE).click();
    },

    checkOrderDetails(){
        cy.get(this.TXT_HEADING).first().should("have.text", "Order Details")
    },

    verifyName(name){
        cy.get('#name').should('have.value', name);
        return this
    },

    verifyEmail(email){
        cy.get('#email').should('have.value', email);
        return this
    },

    verifyPassword(password){
        cy.get(this.INPUT_PASSWORD).should('have.value', password)
        return this
    },

    verifyOrder(orderId){
        cy.get('tr').contains('td', orderId).should('exist');
    },

    verifyOrderStatus(orderId, isPaid){
        cy.get('tr').contains('td', orderId).parent('tr').within(() => {
            if (isPaid) {
                cy.get('td').eq(3).should('match', /\d{4}-\d{2}-\d{2}/); 
            } else {
                cy.get('td').eq(3).find('svg').should('exist'); 
            }
        });
    }
}