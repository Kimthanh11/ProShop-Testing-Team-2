const {loginPage} = require("../pages/login");
const {registerPage} = require("../pages/register")
const {homePage} = require("../pages/homepage");

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

it("REG-001 - Verify that user can go to Register screen", () => {
    cy.visit("/login");
    loginPage.clickRegisterButton();
    cy.url().should("include", "/register");
    cy.get('h1').should("contain", "Register")
})

beforeEach(() => {
    cy.visit("/register");
});

it("REG-002 - Verify that user can create a new account with valid information", () => {
    registerPage.typeName("Test").typeEmail("test@email.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton()
    homePage.checkDirectToHomePage("Test")
})

it("REG-003 - Verify that user can't create a new account without enter any information into fields", () => {
    registerPage.clickRegisterButton().verifyErrorMessage("User validation failed: email: Path `email` is required., password: Path `password` is required.")
})

it("REG-004 - Verify that user can create a new account when missing Name field ", () => {
    registerPage.typeEmail("test01@email.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton()
    homePage.checkDirectToHomePage("Test")
})

it("REG-005 - Verify that user can't create a new account when enter space characters to Name field", () => {
    registerPage.typeName(" ").typeEmail("test02@email.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton().verifyErrorMessage("User validation failed: name: Path `name` cannot be null.")
})

it("REG-006 - Verify that user can't create a new account when missing 'Email Address' field ", () => {
    registerPage.typeName("Test").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton().verifyErrorMessage("User validation failed: email: Path `email` is required.")

})

it("REG-007 - Verify that user can't create a new account when missing '@' symbol in 'Email Address' field", () => {
    registerPage.typeName("Test").typeEmail("test03email.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton()

    cy.url().should("include", "/register")
})

it("REG-008 - Verify that user can't create a new account when missing a domain name in 'Email Address' field", () => {
    registerPage.typeName("Test").typeEmail("test03@.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton()

    cy.url().should("include", "/register")
})

it("REG-009 - Verify that user can't create a new account when missing '.' symbol in domain name in 'Email Address' field", () => {
    registerPage.typeName("Test").typeEmail("test@gmailcom").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton()

    cy.url().should("include", "/register")
})

it("REG-010 - Verify that user can't create a new account when enter spaces characters to 'Email Address' field", () => {
    registerPage.typeName("Test").typeEmail("      ").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton().verifyErrorMessage("User validation failed: email: Path `email` is required.")
})

it("REG-011 - Verify that user can't create a new account when using an email which is exist in system", () => {
    registerPage.typeName("Test").typeEmail("admin@email.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayLaPass2111@").clickRegisterButton().verifyErrorMessage("User already exists")
})

it("REG-012 - Verify that user can't create a new account when missing 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test04@email.com").clickRegisterButton().verifyErrorMessage("User validation failed: password: Path `password` is required.")
})

it("REG-013- Verify that user can't create a new account when missing lowercase letter into 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test05@gmail.com").typePassword("dayLaPass2111@").typeConfirmPassword("dayLaPass2111@").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password must contain at least one lowercase letter")
})

it("REG-014 - Verify that user can't create a new account when missing lowercase letter into 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test06@gmail.com").typePassword("DAYLAPASS2111@").typeConfirmPassword("DAYLAPASS2111@").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password must contain at least one lowercase letter")
})

it("REG-015 - Verify that user can't create a new account when missing numbers letter into 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test07@email.com").typePassword("DayLaPass@").typeConfirmPassword("DayLaPass@").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password must contain at least one number")
})

it("REG-016 - Verify that user can't create a new account when missing special letter into 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test08@email.com").typePassword("DayLaPass2111").typeConfirmPassword("DayLaPass2111").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password must contain at least one special character")
})

it("REG-017 - Verify that user can't create a new account when 'Password' field smaller than 8 characters long", () => {
    registerPage.typeName("Test").typeEmail("test09@email.com").typePassword("Day21@").typeConfirmPassword("Day21@").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password must be at least 8 characters long")
})

it("REG-018 - Verify that user can't create a new account when using user's email for 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test10@email.com").typePassword("test10@email.com").typeConfirmPassword("test10@email.com").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password cannot be the same as email")
})

it("REG-019 - Verify that user can't create a new account when using sequential characters for 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test11@email.com").typePassword("AbcD1234@").typeConfirmPassword("AbcD1234@").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password cannot contain sequential characters")
})

it("REG-020 - Verify that user can't create a new account when using repeated characters for 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test12@email.com").typePassword("AaAaAaAa@").typeConfirmPassword("AaAaAaAa@").clickRegisterButton().verifyErrorMessage("User validation failed: password: Password cannot contain repeated characters")
})

it("REG-021 - Verify that user can't create a new account when enter space characters in 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test13@email.com").typePassword("          ").typeConfirmPassword("          ").clickRegisterButton().verifyErrorMessage("Password do not match")
})

it("REG-022 - Verify that user can't create a new account when missing 'Confirm Password' field", () => {
    registerPage.typeName("Test").typeEmail("test14@email.com").typePassword("AbcD1234@").clickRegisterButton().verifyErrorMessage("Password do not match")
})

it("REG-023 - Verify that user can't create a new account when enter 'Confirm Password' field different with 'Password' field", () => {
    registerPage.typeName("Test").typeEmail("test15@email.com").typePassword("DayLaPass2111@").typeConfirmPassword("DayKhongLaPass2111@").clickRegisterButton().verifyErrorMessage("Passwords do not match")
})

it("Go back to Login page successful", () => {
    registerPage.clickLoginButton();
    cy.url().should("include", "/login");
})
