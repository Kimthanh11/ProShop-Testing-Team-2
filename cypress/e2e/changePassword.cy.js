const {loginPage} = require("../pages/login");
const { homePage } = require("../pages/homepage");
const {profilePage} = require("../pages/userprofile")

beforeEach(() => {
    cy.visit("/login");
    cy.get(loginPage.TXT_EMAIL).type("john@email.com")
    cy.get(loginPage.TXT_PASSWORD).type("123456")
    loginPage.clickSignInButton()

    cy.get("#username").click();
    cy.get("a[href='/profile']").click()

  });

  it("Change Password successfully", () => {
    cy.get(profilePage.TXT_Password).type(12345678)
    cy.get(profilePage.TXT_CnfPassword).type(12345678)
    profilePage.clickUpdateButton()
    
    cy.get(".Toastify__toast-body").should("contain", "Profile updated successfully")

    //Logout account
    
    cy.get(".Toastify__close-button").click()

    cy.get("#username").click()
    cy.get(".dropdown-menu > [role='button']").click()

    cy.url().should("contain", "/login")

    //Login account with new password
    cy.get(loginPage.TXT_EMAIL).type("john@email.com")
    cy.get(loginPage.TXT_PASSWORD).type("12345678")
    loginPage.clickSignInButton()
    homePage.checkDirectToHomePage("John Doe")

    //Change to the old password
    cy.get("#username").click();
    cy.get("a[href='/profile']").click()

    cy.get(profilePage.TXT_Password).type(123456)
    cy.get(profilePage.TXT_CnfPassword).type(123456)
    profilePage.clickUpdateButton()
    
    cy.get(".Toastify__toast-body").should("contain", "Profile updated successfully")

  })

  it("Account keep old password when click update button without any information in password field", () => {
    profilePage.clickUpdateButton()
    
    cy.get(".Toastify__toast-body").should("contain", "Profile updated successfully")

    //Logout account
    
    cy.get(".Toastify__close-button").click()

    cy.get("#username").click()
    cy.get(".dropdown-menu > [role='button']").click()

    cy.url().should("contain", "/login")

    //Login account with old password
    cy.get(loginPage.TXT_EMAIL).type("john@email.com")
    cy.get(loginPage.TXT_PASSWORD).type("123456")
    loginPage.clickSignInButton()
    homePage.checkDirectToHomePage("John Doe")
  })

  it("Can't change password when password and confirm password do not match",() => {
    cy.get(profilePage.TXT_Password).type(12345678)
    cy.get(profilePage.TXT_CnfPassword).type(123456)
    profilePage.clickUpdateButton()
    
    cy.get(".Toastify__toast-body").should("contain", "Password do not match")

  })

  it("Can't change password when new password does not satisfy business rules", () => {
    cy.get(profilePage.TXT_Password).type("1 2 3 4 5 6")
    cy.get(profilePage.TXT_CnfPassword).type("1 2 3 4 5 6")
    profilePage.clickUpdateButton()
    
    cy.get(".Toastify__toast-body").should("contain", "Password do not match")

    // Return password to "123456"
    cy.get(profilePage.TXT_Password).type("123456")
    cy.get(profilePage.TXT_CnfPassword).type("123456")
    profilePage.clickUpdateButton()
  })


  