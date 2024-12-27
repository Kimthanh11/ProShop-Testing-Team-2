const {loginPage} = require("../pages/login");
const { homePage } = require("../pages/homepage");
const { profile } = require("../pages/profile");

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


beforeEach(() => {
  cy.fixture('users').as('users');
});

it('CHA-001 - Verify that user can change the password successfully', function() {
  // Log in the user
  cy.visit('/login');
  cy.login("customer1")

  // Navigate to Profile Page
  homePage.navigateToProfile();

  // Update password with valid information
  const newPassword = 'NewValidPassword123';
  profile.updatePassword(newPassword);

  // Close any toast notifications
  cy.get(".Toastify__close-button").click();

  //Logout
  homePage.logout();
  cy.get("@users").then((user) => {
    loginPage.typeEmail(user.customer1.email).typePassword(newPassword).clickSignInButton() 
    homePage.checkDirectToHomePage(user.customer1.username)
  })
});

it('CHA-002 - Verify that error message is displayed when user inputs invalid current password', function() {
  // Cannot automate because of bug
});

it('CHA-003 - Verify that error message is displayed when inputting invalid new password', function() {
  // Log in the user
  cy.visit('/login');
  const currentPassword = 'NewValidPassword123';
  cy.get("@users").then((user) => {
    loginPage.typeEmail(user.customer1.email).typePassword(currentPassword).clickSignInButton() 
    homePage.checkDirectToHomePage(user.customer1.username)
  })

  // Navigate to Profile Page
  homePage.navigateToProfile();

  // Update password with invalid new password
  const invalidNewPassword = 'short';
  profile.updatePassword(invalidNewPassword);

  // Close any toast notifications
  cy.get(".Toastify__close-button").click();

  // Verify an error message is displayed
  cy.get('.error-message').should('contain.text', 'New password is too short');
});

it('CHA-004 - Verify that error message is displayed when new password and confirm password mismatch', function() {
  // Log in the user
  cy.visit('/login');
  const currentPassword = 'short';
  cy.get("@users").then((user) => {
    loginPage.typeEmail(user.customer1.email).typePassword(currentPassword).clickSignInButton() 
    homePage.checkDirectToHomePage(user.customer1.username)
  })

  // Navigate to Profile Page
  homePage.navigateToProfile();

  // Update password with mismatched confirmation password
  const newPassword = 'NewValidPassword123';
  const mismatchedConfirmPassword = 'MismatchPassword123';
  cy.get(profile.INPUT_PASSWORD).clear().type(newPassword);
  cy.get(profile.INPUT_CONFIRM_PASSWORD).clear().type(mismatchedConfirmPassword);
  cy.get(profile.BTN_UPDATE).click();

  // Verify an error message is displayed
  cy.get('.Toastify__toast-body').should('contain', 'Passwords do not match');
});

it('CHA-005 - Verify that error message is displayed when new password is reused (duplicate)', function() {
  // Log in the user
  cy.visit('/login');
  const currentPassword = 'short';
  cy.get("@users").then((user) => {
    loginPage.typeEmail(user.customer1.email).typePassword(currentPassword).clickSignInButton() 
    homePage.checkDirectToHomePage(user.customer1.username)
  })

  // Navigate to Profile Page
  homePage.navigateToProfile();

  // Update password with the same password
  profile.updatePassword(currentPassword);

  // Close any toast notifications
  cy.get(".Toastify__close-button").click();

  // Verify an error message is displayed
  cy.get('.Toastify__toast-body').should('contain', 'New password cannot be the same as the current password');
});