const {loginPage} = require("../pages/login");
const { homePage } = require("../pages/homepage");

beforeEach(() => {
    cy.visit("/login");
    cy.fixture("users").as("user")
  });

it("Successful login for admin", () => {
  
    cy.get("@user").then((user) => {
      loginPage.typeEmail(user.admin.email).typePassword(user.admin.password).clickSignInButton() 
      homePage.checkDirectToHomePage(user.admin.username)
    })
})

it("Successful login for user", () => {
  
  cy.get("@user").then((user) => {
    loginPage.typeEmail(user.customer1.email).typePassword(user.customer1.password).clickSignInButton() 
    homePage.checkDirectToHomePage(user.customer1.username)
  })
})

it("Can't login when missing both email and password", () => {
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")

})

it("Can't login when missing email", () => {
  cy.get(loginPage.TXT_PASSWORD).type("123456")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("Can't login when missing password", () => {
  cy.get(loginPage.TXT_EMAIL).type("admin@email.com")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("Can't login when using information not exists in system", () => {
  cy.get(loginPage.TXT_EMAIL).type("tester0123@gmail.com")
  cy.get(loginPage.TXT_PASSWORD).type("AbcdEf123456")
  loginPage.clickSignInButton()

  cy.get('.Toastify__toast-body').should("contain", "Invalid email or password")
})

it("Can login when adding space character before and after email", () => {
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