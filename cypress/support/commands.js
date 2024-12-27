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
import { loginPage } from "../pages/login";
import { productDetails } from "../pages/productDetails";
import { registerPage } from "../pages/register";
import { shipping } from "../pages/shipping";

Cypress.Commands.add('searchAndSelectProduct', (productName) => {
    homePage.searchProduct(productName)
        .checkProductAppearedAfterSearch(productName);
    homePage.selectProduct(productName);
});

Cypress.Commands.add('addProductToCart', (productName) => {
    cy.searchAndSelectProduct(productName);
    productDetails.addToCart();
});

Cypress.Commands.add('verifyCartCount', (expectedCount) => {
    homePage.checkNumberOfProductsInCart(expectedCount);
});

Cypress.Commands.add('login', (userType) => {
  cy.fixture("users").then((users) => {
      const user = users[userType]; // userType can be 'admin' or 'customer1'
      loginPage.typeEmail(user.email)
          .typePassword(user.password)
          .clickSignInButton();
      homePage.checkDirectToHomePage(user.username);
  });
});

Cypress.Commands.add('register', (email, name, password) => {
  // Perform the registration steps with the provided data
  cy.get(registerPage.TXT_NAME).type(name);
  cy.get(registerPage.TXT_EMAIL).type(email);
  cy.get(registerPage.TXT_PASSWORD).type(password);
  cy.get(registerPage.TXT_CNFPASS).type(password);  

  registerPage.clickRegisterButton();  // Submit the form
});

Cypress.Commands.add('inputAddress', () => {
    cy.get("@address").then((address) => {
        shipping
            .inputAddress(address.address)
            .inputCity(address.city)
            .inputPostalCode(address.postalCode)
            .inputCountry(address.country)
            .proceedToCheckout();
    });
})

/**
 * Returns an iframe content
 */
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
      $iframe.ready(function () {
        resolve($iframe.contents().find('body'));
      });
    });
  });
  
  // Used to keep the reference to the popup window
  const state = {}
  
  /**
   * Intercepts calls to window.open() to keep a reference to the new window
   */
  Cypress.Commands.add('capturePopup', () => {
    cy.window().then((win) => {
      const open = win.open
      cy
        .stub(win, 'open')
        .callsFake((...params) => {
          // Capture the reference to the popup
          state.popup = open(...params)
          return state.popup
        })
    })
  })
  
  /**
   * Returns a wrapped body of a captured popup
   */
  Cypress.Commands.add('popup', () => {
    const popup = Cypress.$(state.popup.document)
    return cy.wrap(popup.contents().find('body'))
  })
  
  /**
   * Clicks on PayPal button and signs in
   */
  Cypress.Commands.add('paypalFlow', (email, password) => {
    // Enable popup capture
    cy.capturePopup()
    // Click on the PayPal button inside PayPal's iframe
    cy.get('iframe').iframe().find('div[data-funding-source="paypal"]').click()
    // It will first inject a loader, wait until it changes to the real content
    cy
      .popup()
      .find('div')
      .should('not.exist')
      .wait(1000) // Not recommended, but the only way I found to wait for the real content
    cy
      .popup()
      .then($body => {
        // Check if we need to sign in
        if ($body.find('input#email').length) {
          cy
            .popup()
            .find('input#email')
            .clear()
            .type(email)
          // Click on the button in case it's a 2-step flow
          cy.popup()
            .find('button:visible')
            .first()
            .click()
          cy.popup()
            .find('input#password')
            .clear()
            .type(password)
          cy.popup()
            .find('button#btnLogin')
            .click()
        }
      })
    cy
      .popup()
      .find('button#btnLogin')
      .should('not.exist')
    cy.wait(1000)
    cy
      .popup()
      .find('div.reviewButton')
      .should('exist')
  })
  
  /**
   * Returns the price shown in PayPal's summary
   */
  Cypress.Commands.add('paypalPrice', () => {
    return cy.popup().find('span#totalWrapper')
  })
  
  /**
   * Completes PayPal flow
   */
  Cypress.Commands.add('paypalComplete', () => {
    cy
      .popup()
      .find('ul.charges')
      .should('not.to.be.empty')
    cy.wait(1000)
    cy
      .popup()
      .find('button.continueButton')
      .click()
    cy
      .popup()
      .find('input[data-test-id="continueButton"]')
      .click()
  })