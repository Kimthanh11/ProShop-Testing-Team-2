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
    
    pay(){
        cy.popup().then(($popupBody) => {
            cy.wrap($popupBody).find(this.BTN_PAY).click();
        });
    }
};
