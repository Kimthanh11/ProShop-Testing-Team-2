const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");

describe('Admin Mark Order as Delivered', () => {
  before(() => {
    // Visit login page and log in as admin
    cy.visit("/login");
    cy.fixture("users").as("user").then((user) => {
      loginPage.typeEmail(user.admin.email)
        .typePassword(user.admin.password)
        .clickSignInButton();
    });

    // Assert login successful
    cy.get('#basic-navbar-nav', { timeout: 10000 })
      .contains(/^Admin$/) // Match exact "Admin" text
      .should('be.visible');

    // Navigate to Admin Menu and Orders page
    cy.get('#basic-navbar-nav').contains(/^Admin$/).click();
    cy.get('#adminmenu', { timeout: 10000 }).should('be.visible'); // Ensure admin menu is visible
    cy.get('[href="/admin/orderlist"]').should('be.visible').click(); // Navigate to Orders
  });

  it('Loops through rows, marks orders as delivered, and returns to orders page', () => {
    const processRows = () => {
      // Iterate through each row in the table
      cy.get('table tbody tr', { timeout: 10000 }).each(($row) => {
        // Alias the current row
        cy.wrap($row).as('currentRow');

        // Check column 5 (PAID) for a date
        cy.get('@currentRow')
          .find('td:nth-child(5)') // PAID column
          .invoke('text')
          .then((paidText) => {
            const isPaidDate = /\d{4}-\d{2}-\d{2}/.test(paidText); // Match YYYY-MM-DD

            if (isPaidDate) {
              // Check column 6 (DELIVERED) for absence of a date
              cy.get('@currentRow')
                .find('td:nth-child(6)') // DELIVERED column
                .invoke('text')
                .then((deliveredText) => {
                  const isDeliveredDate = /\d{4}-\d{2}-\d{2}/.test(deliveredText); // Match YYYY-MM-DD

                  if (!isDeliveredDate) {
                    // Click "Details" link in column 7
                    cy.get('@currentRow')
                      .find('td:nth-child(7) a') // "Details" link
                      .should('be.visible')
                      .click();

                    // Mark the order as delivered
                    cy.intercept('PUT', '**/api/orders/**').as('markDelivered');
                    cy.get('button.btn-primary', { timeout: 10000 }) // Button for marking as delivered
                      .should('be.visible')
                      .should('not.be.disabled')
                      .click({ force: true });

                    // Wait for the API call to complete
                    cy.wait('@markDelivered', { timeout: 10000 })
                      .its('response.statusCode')
                      .should('eq', 200);

                    // Reload Orders page
                    cy.get('#basic-navbar-nav')
                      .contains(/^Admin$/)
                      .click({ force: true });
                    cy.get('[href="/admin/orderlist"]').should('be.visible').click();

                    // Wait for the orders table to reload
                    cy.get('table tbody tr', { timeout: 10000 }).should('exist');
                  }
                });
            }
          });
      });
    };

    // Start processing rows
    processRows();
  });
});