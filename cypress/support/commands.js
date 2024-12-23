// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

import { homePage } from "../pages/homepage";
import { productDetails } from "../pages/productDetails";

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('searchAndSelectProduct', (productName) => {
    homePage.searchProduct(productName)
        .checkProductAppearedAfterSearch(productName);
    homePage.selectOneProduct(productName);
});

Cypress.Commands.add('addProductToCart', (productName) => {
    cy.searchAndSelectProduct(productName);
    productDetails.addToCart();
});

Cypress.Commands.add('verifyCartCount', (expectedCount) => {
    homePage.checkNumberOfProductsInCart(expectedCount);
});
