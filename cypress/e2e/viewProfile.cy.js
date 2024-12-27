const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");
const { profile } = require("../pages/profile");
const { productDetails } = require("../pages/productDetails");
const { shoppingCart } = require("../pages/shoppingCart");
const { orderSummary } = require("../pages/orderSummary");
const { payment } = require("../pages/payment");
const { paypalPopup } = require("../pages/paypalPopup");

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
    cy.visit("/login");
    cy.fixture("users").as("user");
    cy.fixture("products").as("product");
    cy.fixture("addresses").as("address");
});

it('Verify that user information is displayed when clicking on Profile Page, in case user has logged in the account and do not have order', function() {

    // Login
    cy.visit('/login');
    cy.login("customer1");

    // Navigate to Profile Page
    homePage.navigateToProfile();

    // Verify user information is displayed
    cy.get("@user").then((user) => {
        profile.verifyName(user.customer1.username).verifyEmail(user.customer1.email);
    })
});

it('Verify that user information is displayed when clicking on Profile Page, in case user has logged in the account. and have order', function() {
    // Register a new user
    cy.visit('/login');
    cy.login("customer1");
    
    cy.get("@product").then((product) => {
          homePage.selectProduct(product.sony.name)
        })
        
    // Add selected product to cart
    productDetails.addToCart()

    // Proceed to checkout
    shoppingCart.proceedToCheckout()
    
    // Search for another product
    cy.get("@product").then((product) => {
        // Search for a specific product and verify it appears in the search results
        homePage.searchProduct(product.cannon.name)
        .checkProductAppearedAfterSearch(product.cannon.name);

        // Select one product
        homePage.selectProduct(product.cannon.name);

        // Add the searched product to cart
        productDetails.addToCart()

        // Proceed to checkout
        shoppingCart.proceedToCheckout()
    })
    
    // Fill out shipping address
    cy.inputAddress()

    // Enter payment details and place the order
    payment.pay()
    orderSummary.clickPlaceOrder()

    // Paypal
    orderSummary.clickPaypal()
    cy.wait(5000)
    paypalPopup.login()
    cy.wait(5000)
    paypalPopup.pay()

    // Store order number
    let orderNumber = ''
    cy.get('h1').contains('Order').invoke('text').then((text) => {
        orderNumber = text.replace('Order ', '');
        Cypress.env('orderNumber', orderNumber);
        cy.log(orderNumber);
    });
    cy.wait(10000);

    // Navigate to Profile Page
    homePage.navigateToProfile();

    // Verify user information is displayed
    cy.get("@user").then((user) => {
        profile.verifyName(user.customer1.username).verifyEmail(user.customer1.email).verifyOrder(orderNumber);
    })
});

it.only('Verify that user information is not displayed when clicking on Profile Page, in case that registered user has not logged in the account', function() {
    // Navigate to Profile Page without logging in
    cy.visit('/login');
    loginPage.typeEmail("invalid@email.com").typePassword("123456").clickSignInButton();
    cy.url().should('include', '/login');
});

it('Verify that Sign-in form displayed in case non-registered users and after register successful, user can see the information when clicking on Profile Page', function() {
    cy.visit('/login');
    loginPage.clickRegisterButton();
    cy.fixture("users").then((users) => {
        cy.register(users.demo.email, users.demo.username, users.demo.password)
      })

    // Navigate to Profile Page without logging in
    cy.visit('/profile');
    cy.url().should('include', '/login');
    cy.login("demo");

    // Navigate to Profile Page
    homePage.navigateToProfile();

    // Verify user information is displayed
    cy.get("@user").then((user) => {
        profile.verifyName(user.demo.username).verifyEmail(user.demo.email)
    })
});