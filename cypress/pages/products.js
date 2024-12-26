export const products = {
    BTN_CREATE_PRODUCT: 'button.my-3.btn.btn-primary',  
    
    clickCreateProduct() {
        cy.get(this.BTN_CREATE_PRODUCT).click();
        return this;
    }
}
