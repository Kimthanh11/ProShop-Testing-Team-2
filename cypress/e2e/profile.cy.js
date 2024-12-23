const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");

beforeEach(() => {
    cy.visit("/login");
    cy.fixture("users").as("user");
});

it("Successful login for a user", () => {
    cy.get("@user").then((user) => {
        // Perform login
        loginPage.typeEmail(user.customer1.email)
                 .typePassword(user.customer1.password)
                 .clickSignInButton();

        // Verify redirection to homepage
        homePage.checkDirectToHomePage(user.customer1.username);

        // Ensure #username is visible
        cy.get('#username', { timeout: 10000 })
          .should('be.visible');
    });

    // Ensure the navbar contains any user-related entry
    cy.get('#basic-navbar-nav', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
          cy.get('#username').should('be.visible'); // Checks visibility of the #username element
      });

    // Navigate to Profile page dynamically
    cy.get('#basic-navbar-nav').within(() => {
        cy.get('#username').click();
    });
    cy.get('[href="/profile"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get('#password').clear().type('123456');
    cy.get('#confirmPassword').clear().type('123456');
    cy.get('.col-md-3 > form > .btn').click();
});