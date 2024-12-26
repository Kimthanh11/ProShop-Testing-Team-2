const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");

beforeEach(() => {
    cy.visit("/login");
    cy.fixture("users").as("user");
  });
  
  it("Successful login for John", () => {
    cy.get("@user").then((user) => {
      loginPage.typeEmail(user.customer1.email)
               .typePassword(user.customer1.password)
               .clickSignInButton();
  
      // Verify redirection to homepage
      homePage.checkDirectToHomePage(user.customer1.username);
  
      // Wait for the username to load and assert
      cy.get('#username', { timeout: 10000 })
        .should('be.visible')
        .and('have.text', user.customer1.username);
    });


    cy.get(':nth-child(5) > .my-3 > :nth-child(1) > .card-img-top').click();
    cy.get('.btn-block').click();
    cy.get('.btn-block').click();
    cy.get('#address').clear().type('No.45, Pham Hung');
    cy.get('#city').clear().type('Ho Chi Minh City');
    cy.get('#postalCode').clear().type('7000');
    cy.get('#country').clear().type('Vietnam');
    cy.get('.col-md-6 > form > .btn').click();
    cy.get('.col-md-6 > form > .btn').click();
    cy.get('.btn-block').click();

// Custom command to interact with iframe content
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
    return cy
      .get(iframeSelector, { timeout: 10000 }) // Wait for the iframe to load
      .its('0.contentDocument.body') // Access iframe's body
      .should('not.be.empty') // Ensure the body is loaded
      .then(cy.wrap); // Wrap for Cypress commands
  });
  
  // Test: Interact with PayPal button inside iframe
  it('Click PayPal button inside iframe', () => {
    // Wait for the iframe to appear
    cy.getIframeBody('iframe[id^="jsx-iframe-"]').within(() => {
      // Wait for the PayPal button to be visible and click it
      cy.contains('PayPal', { timeout: 10000 })
        .should('be.visible')
        .click(); // Click PayPal button inside iframe
    });
  });
  
  // Test: Click PayPal button in order summary
  it('Click PayPal button in order summary', () => {
    // Wait for the PayPal button in the order summary to appear and click it
    cy.get('.list-group > :nth-child(6)', { timeout: 10000 }) // Wait for the button to appear
      .should('be.visible') // Ensure the button is visible
      .click(); // Click PayPal button in the order summary
  });


  });
  
