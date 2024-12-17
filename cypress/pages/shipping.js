export const shipping = {
    BTN_CHECKOUT: '.btn.btn-primary',
    INPUT_ADDRESS: '#address',
    INPUT_CITY: '#city',
    INPUT_POSTALCODE: '#postalCode',
    INPUT_COUNTRY: '#country',

    inputAddress(address) {
        cy.get(this.INPUT_ADDRESS).type(address);
        return this;
    },

    inputCity(city) {
        cy.get(this.INPUT_CITY).type(city);
        return this;
    },

    inputPostalCode(postalCode) {
        cy.get(this.INPUT_POSTALCODE).type(postalCode);
        return this;
    },

    inputCountry(country) {
        cy.get(this.INPUT_COUNTRY).type(country);
        return this;
    },

    proceedToCheckout() {
        cy.get(this.BTN_CHECKOUT).click();
        return this;
    }
};
