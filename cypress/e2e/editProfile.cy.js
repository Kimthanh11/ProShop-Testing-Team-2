import { homePage } from "../pages/homepage";
import { loginPage } from "../pages/login";
import { profile } from "../pages/profile";

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

it('Verify that user can edit profile with valid information (name and email)', function() {    
  cy.visit('/login');
  cy.login("customer1")
  
    // Change name and password after login
    homePage.navigateToProfile()

    // Navigate to Profile Page
    homePage.navigateToProfile();

    // Edit profile with valid information
    const newName = 'Updated Name';
    const newEmail = 'test@email.com';
    profile.updateName(newName)
    profile.updateEmail(newEmail)
    cy.wait(5000);

    // Logout
    homePage.logout();

    // Log in with the new email
    loginPage.typeEmail(newEmail).typePassword('123456').clickSignInButton();

    // Navigate to Profile Page
    homePage.navigateToProfile();

    // Verify the profile is updated
    profile.verifyEmail(newEmail);
});

  it('Verify that user cannot edit profile with invalid information (in email)', function() {
    // Log in the user
    cy.visit('/login');
    cy.login("customer2")

    // Navigate to Profile Page
    homePage.navigateToProfile();

    // Edit profile with invalid email
    const invalidEmail = 'invalid-email';
    profile.updateEmail(invalidEmail)

    // Verify an error message is displayed
    cy.get('input:invalid').each(($input) => {
      cy.wrap($input).invoke('prop', 'validationMessage').should('contain', "Please include an '@' in the email address. 'invalid-email' is missing an '@'.");
  });
});