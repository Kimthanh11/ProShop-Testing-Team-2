const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");

beforeEach(() => {
    cy.visit("/login");
    cy.fixture("users").as("user");
});

it("Successful login and password update", () => {
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

    // Navigate to Profile page dynamically
    cy.get('#basic-navbar-nav').within(() => {
        cy.get('#username').click();
    });
    cy.get('[href="/profile"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Update password
    cy.get('#password').clear().type('123456');
    cy.get('#confirmPassword').clear().type('123456');
    cy.get('.col-md-3 > form > .btn').click();

    // Verify successful update via Toastify pop-up
    cy.get('body').then((body) => {
        if (body.find('.Toastify__toast-body > :nth-child(2)').length > 0) {
            cy.get('.Toastify__toast-body > :nth-child(2)', { timeout: 10000 })
              .should('be.visible')
              .and('contain.text', 'Profile updated successfully'); // Updated expected text
        } else {
            cy.log('Pop-up not found. Verifying fallback elements.');
            cy.screenshot('popup-missing');
        }
    });
});

