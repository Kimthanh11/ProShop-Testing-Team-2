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

// Admin flow
it('Admin: Login, Create product, Update user, Delete user', () => {
    // Admin Login
    // Navigate to the admin login page and log in as an admin
    cy.visit("/login");
    cy.login('admin');
    
    // Admin Create product
    // Navigate to product creation page and fill in product details
    homePage.navigateAdminProducts()
    products.clickCreateProduct()
    
});

// User flow
it('User: Browse products, Register, Add to cart, Checkout', () => {
    // Navigate to homepage and select a product
    cy.visit("/")
    cy.get("@product").then((product) => {
      homePage.selectProduct(product.sony.name)
    })
    
    // Add selected product to cart
    productDetails.addToCart()

    // Proceed to checkout
    shoppingCart.proceedToCheckout()

    // User is redirected to Register page (because they are not logged in)
    // Complete the registration process
    loginPage.clickRegisterButton()
    cy.fixture("users").then((users) => {
      cy.register(users.demo.email, users.demo.username, users.demo.password)
    })

    // Change name and password after login
    homePage.navigateToProfile()
    profile.updateNameAndPassword()

    // Search for another product
    cy.get("@product").then((product) => {
      // Search for a specific product and verify it appears in the search results
      homePage.searchProduct(product.cannon.name)
      .checkProductAppearedAfterSearch(product.cannon.name);

      // Select one product
      homePage.selectProduct(product.cannon.name);

      // Add the searched product to cart
      productDetails.addToCart()

      // Remove 1 product from the cart
      shoppingCart.removeProduct(product.sony.name)

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

    // Check order details
    cy.wait(15000)
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
    // Admin Login (again if needed)
    cy.login('admin');

    // View all orders
    homePage.navigateAdminOrders()

    // View specific order details
    const orderNumber = Cypress.env('orderNumber');
    cy.get(`a[href="/order/${orderNumber}"]`).first().click()

    // Mark order as delivered
    orderSummary.clickDelivered()
});

// User flow: Login, Check order, Review product
it('User: Login, Check order, Review product', () => {
    // Login as a registered user
    cy.visit("/login");
    cy.login('demo');

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
});

