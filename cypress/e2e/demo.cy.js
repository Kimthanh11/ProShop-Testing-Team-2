import { homePage } from "../pages/homepage";
import { loginPage } from "../pages/login";
import { orderSummary } from "../pages/orderSummary";
import { payment } from "../pages/payment";
import { paypalPopup } from "../pages/paypalPopup";
import { productDetails } from "../pages/productDetails";
import { products } from "../pages/products";
import { profile } from "../pages/profile";
import { shoppingCart } from "../pages/shoppingCart";

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
    cy.fixture("users").as("user")
    cy.fixture("products").as("product")
    cy.fixture("addresses").as("address")
    
});

// User flow
it('User: Register, Browse products, Add to cart, Checkout', () => {
    cy.visit("/login");
    // User is redirected to Register page (because they are not logged in)
    // Complete the registration process
    loginPage.clickRegisterButton()
    cy.fixture("users").then((users) => {
      cy.register(users.demo.email, users.demo.username, users.demo.password)
    })

    // Change name and password after login
    homePage.navigateToProfile()
     // Edit profile with valid information
     const newName = 'Updated Name';
     const newEmail = 'updated@gmail.com';
     const password = '1234'
     profile.updateNamePasswordEmail(newName, password, newEmail)
     cy.get('.Toastify__toast-body').should('contain', 'Profile updated successfully')
     cy.get('.Toastify__close-button').click()
 
     // Logout
     homePage.logout();
 
     // Log in with the new email
     cy.wait(1000);
     loginPage.typeEmail(newEmail).typePassword(password).clickSignInButton();

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
    cy.wait(5000)
    cy.get('.Toastify__toast-body').should('contain', 'Order is paid')
    cy.get('.Toastify__close-button').click()

    // Store order number
    let orderNumber = ''
cy.get('h1').contains('Order').invoke('text').then((text) => {
    orderNumber = text.replace('Order ', '');
    Cypress.env('orderNumber', orderNumber);
    cy.log(orderNumber);

    // Check order details
    homePage.navigateToProfile()
    profile.navigateToDetailedOrder(orderNumber)
    orderSummary.checkStatusOrder(false)
    
});
    // Logout
    homePage.logout()
});

// Admin flow: View all orders, View order details, Mark order as delivered
it('Admin: View orders, View details, Mark as delivered', () => {
  cy.visit("/login");
  cy.login('admin');

    // View all orders
    homePage.navigateAdminOrders()

    // View specific order details
    const orderNumber = Cypress.env('orderNumber');
    cy.get(`a[href="/order/${orderNumber}"]`).first().click()
    
    // Check order is paid
    orderSummary.checkStatusOrder(false)

    // Mark order as delivered
    orderSummary.clickDelivered()

    // Check order is delivered
    orderSummary.checkStatusOrder(true)
});

// User flow: Login, Check order, Review product
it('User: Login, Check order, Review product', () => {
    // Login as a registered user
    cy.visit("/login");
    const newEmail = 'updated@gmail.com';
    const password = '1234'
    // Admin Login (again if needed)
    loginPage.typeEmail(newEmail).typePassword(password).clickSignInButton();

    // Check order history
    homePage.navigateToProfile()

    // Review a product
    const orderNumber = Cypress.env('orderNumber')
    profile.navigateToDetailedOrder(orderNumber)
    orderSummary.checkStatusOrder(true)
    cy.get("@product").then((product) => {
      orderSummary.navigateToProductDetails(product.cannon.name)
    })
    cy.scrollTo('bottom');
    productDetails.reviewProduct()
    productDetails.verifyReview('Updated Name')
});

