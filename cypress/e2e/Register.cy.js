const {loginPage} = require("../pages/login");
const {registerPage} = require("../pages/register")
const {homePage} = require("../pages/homepage");

it("Go to Register page successful", () => {
  
    cy.visit("/login");
    loginPage.clickRegisterButton();
    cy.url().should("include", "/register");
    })

beforeEach(() => {
    cy.visit("/register");
    });

it("Create a new account with valid information successful", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()
   //expected go to home page
})

it("Can't Create a new account with empty information", () => {
    registerPage.clickRegisterButton();

    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")
    //cy.get('.Toastify__toast-body').should("contain", "email: Path 'email' is required.");
    //cy.get('.Toastify__toast-body').should("contain", "password: Path 'password' is required.");
})

it("Create a new account without Name successful", () => {
    cy.get(registerPage.TXT_EMAIL).type("test01@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()
   //expected go to home page

})

it("Can't Create a new account with space characters in Name", () => {
    cy.get(registerPage.TXT_NAME).type("          ")
    cy.get(registerPage.TXT_EMAIL).type("test02@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()
    
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't Create a new account without Email address", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()
    
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")
    //cy.get('.Toastify__toast-body').should("contain", "email: Path 'email' is required");

})

it("Can't create a new account with invalid Email address", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register")
})

it("Can't create a new account with space characters in Email address", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("          ")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with email exists in the system", () => {
    //exists email address admin@email.com
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("admin@email.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User already exists")

})

it("Can't create a new account without password", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test04@email.com")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with password missing uppercase letter", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test05@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("daylapass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("daylapass2111@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with password missing lower letter", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test06@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DAYLAPASS2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DAYLAPASS2111@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with password missing numbers letter", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test07@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass@")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with password missing special letter", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test08@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111")
    cy.get(registerPage.TXT_CNFPASS).type("DayLaPass2111")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with password smaller than 8 characters", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test09@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("Day21@")
    cy.get(registerPage.TXT_CNFPASS).type("Day21@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with Password same as email address", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test10@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("test123@gmail.com")
    cy.get(registerPage.TXT_CNFPASS).type("test123@gmail.com")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account when using sequential characters for password", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test11@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("test123@gmail.com")
    cy.get(registerPage.TXT_CNFPASS).type("test123@gmail.com")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register");
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")

})

it("Can't create a new account with space character into password", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test12@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("          ")
    cy.get(registerPage.TXT_CNFPASS).type("          ")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register")
    cy.get('.Toastify__toast-body').should("contain", "Passwords do not match")
})

it("Can't create a new account when missing comfirm password", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test13@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    registerPage.clickRegisterButton()
    
    cy.url().should("include", "/register")
    cy.get('.Toastify__toast-body').should("contain", "User validation failed:")
})

it("Can't create a new account when confirm password different with password", () => {
    cy.get(registerPage.TXT_NAME).type("Test")
    cy.get(registerPage.TXT_EMAIL).type("test14@gmail.com")
    cy.get(registerPage.TXT_PASSWORD).type("DayLaPass2111@")
    cy.get(registerPage.TXT_CNFPASS).type("DayKhongLaPass2111@")
    registerPage.clickRegisterButton()

    cy.url().should("include", "/register")
    cy.get('.Toastify__toast-body').should("contain", "Passwords do not match")
})

/*it("Erase a account with admin auth successful", () => {
    registerPage.clickLoginButton();
    cy.get(loginPage.TXT_EMAIL).type("admin@email.com")
    cy.get(loginPage.TXT_PASSWORD).type("123456")
    loginPage.clickSignInButton()
    cy.get('#adminmenu').click()
    cy.contains('a', 'Users').click()
    cy.get('tbody > :nth-child(4) > :nth-child(5) > .btn-danger').click()
})*/


it("Go back to Login page successful", () => {
    registerPage.clickLoginButton();
    cy.url().should("include", "/login");
})
