import 'cypress-iframe'
export const orderSummary = {
    BTN_PLACE_ORDER: 'button.btn-block.btn.btn-primary',
    BTN_PAYPAL: '.paypal-button-label-container',
    BTN_DELIVERED: 'button.btn.btn-block.btn.btn-primary',

    clickPlaceOrder(){
        cy.get(this.BTN_PLACE_ORDER).contains('Place Order').click();
        return this
    },

    clickPaypal() { 
        cy.capturePopup(); // Enable popup capture
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test
            return false;
          });
        cy.get('iframe[id^="jsx-iframe-"]', { timeout: 10000 }) 
            .should('be.visible')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body');
                cy.wrap($body).find('.paypal-logo-color-blue', { timeout: 10000 }) 
                    .should('be.visible')
                    .first()
                    .click(); 
            });
        return this;
    },
      
    clickDelivered(){
        cy.get(this.BTN_DELIVERED).click();
        return this
    },

    checkStatusOrder(delivered){
        if (!delivered) {
            cy.get('.fade.alert.alert-danger.show').should('contain.text', 'Not Delivered');
        } else {
            cy.get('.fade.alert.alert-success.show').should('contain.text', 'Delivered');
        }
        

        cy.get('.fade.alert.alert-success.show').should('contain.text', 'Paid');
    },

    navigateToProductDetails(product) {
        cy.contains('a', product).click();
    }
};
