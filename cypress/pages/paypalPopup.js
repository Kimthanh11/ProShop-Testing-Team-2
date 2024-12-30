export const paypalPopup = {
    INPUT_EMAIL: '#email',
    BTN_NEXT: '#btnNext',
    INPUT_PASSWORD: '#password',
    BTN_LOGIN: '#btnLogin',
    BTN_PAY: '#payment-submit-btn',

    login(){
        cy.popup().then(($popupBody) => {
            // Interact with the PayPal popup within the same window
            cy.wrap($popupBody).find(this.INPUT_EMAIL).type('john123123@personal.example.com'); 
            cy.wrap($popupBody).find(this.BTN_NEXT).click();
            cy.wrap($popupBody).find(this.INPUT_PASSWORD).type('12345678'); 
            cy.wrap($popupBody).find(this.BTN_LOGIN).click();
        });
        
    },

    loginWrongEmail(){
        cy.popup().then(($popupBody) => {
            // Interact with the PayPal popup within the same window
            cy.wrap($popupBody).find(this.INPUT_EMAIL).type('invalid@email.com'); 
            cy.wrap($popupBody).find(this.BTN_NEXT).click();
            cy.wrap($popupBody).find('p.notification.notification-critical', "Some of your info didn't match. Try again, change the email address, or get help if you forgot your password.")
            .should('be.visible')
            .and('have.attr', 'role', 'alert');
        });
    },

    loginWrongPassword(){
        cy.popup().then(($popupBody) => {
            // Interact with the PayPal popup within the same window
            cy.wrap($popupBody).find(this.INPUT_EMAIL).type('john123123@personal.example.com');
            cy.wrap($popupBody).find(this.BTN_NEXT).click();
            
            // Break up the command chain to ensure Cypress re-queries the DOM
            cy.wrap($popupBody).find(this.INPUT_PASSWORD).type('wrongpassword');
            
            // Click the login button
            cy.wrap($popupBody).find(this.BTN_LOGIN).click();
            
            // Assert that the notification message is displayed
            cy.wrap($popupBody).contains('p.notification.notification-critical', "Some of your info didn't match. Try again, change the email address, or get help if you forgot your password.")
                .should('be.visible')
                .and('have.attr', 'role', 'alert');
        });
    },
    
    pay(){
        cy.popup().then(($popupBody) => {
            cy.wrap($popupBody).find(this.BTN_PAY).click();
        });
    }
};
