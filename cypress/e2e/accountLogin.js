const {loginPage} = require("../pages/login");
const { homePage } = require("../pages/homepage");

beforeEach(() => {
    cy.visit("/login");
    cy.fixture("users").as("user")
  });

it("LOG-001 - Verify that user can sign in successfully with valid information", () => {
    cy.get("@user").then((user) => {
      loginPage.typeEmail(user.admin.email).typePassword(user.admin.password).clickSignInButton() 
      homePage.checkDirectToHomePage(user.admin.username)
    })
})

it("LOG-002 - Verify that user can't sign in without entering valid information into fields", () => {
  loginPage.clickSignInButton()
  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("LOG-003 - Verify that user can't sign in when missing 'Email Address' field", () => {
  cy.get(loginPage.TXT_PASSWORD).type("123456")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("Can't login when email is wrong", () => {
  cy.get(loginPage.TXT_EMAIL).type("wrongemail@gmail.com")
  cy.get(loginPage.TXT_PASSWORD).type("123456")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("LOG-004 - Verify that user can't sign in when missing 'Password' field", () => {
  cy.get(loginPage.TXT_EMAIL).type("admin@email.com")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("Can't login when password is wrong", () => {
  cy.get(loginPage.TXT_EMAIL).type("admin@email.com")
  cy.get(loginPage.TXT_PASSWORD).type("wrongpassword")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("LOG-005 - Verify that user can't sign in when using an email which is not exist in system", () => {
  cy.get(loginPage.TXT_EMAIL).type("tester0123@gmail.com")
  cy.get(loginPage.TXT_PASSWORD).type("AbcdEf123456")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("LOG-006 - Verify that user can sign in when enter space charactor before and after email address in 'Email address' field", () => {
  cy.get("@user").then((user) => {
    cy.get(loginPage.TXT_EMAIL).type("          admin@email.com          ")
    loginPage.typePassword(user.admin.password).clickSignInButton() 
    homePage.checkDirectToHomePage(user.admin.username)
  })
})

it("Go to register page successful", () => {
    loginPage.clickRegisterButton()
    cy.url().should("include", "/register");
})

