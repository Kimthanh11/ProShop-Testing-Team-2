const { loginPage } = require("../pages/login");

before(() => {
  // Run the data:destroy command
  cy.exec('npm run data:destroy').then((result) => {
    cy.log(result.stdout);
  });

  // Run the data:import command
  cy.exec('npm run data:import').then((result) => {
    cy.log(result.stdout);
  });
});

it('Verify that Admin can mark order as delivered.', () => {
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
})
