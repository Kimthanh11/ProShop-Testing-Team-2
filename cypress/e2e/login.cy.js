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

