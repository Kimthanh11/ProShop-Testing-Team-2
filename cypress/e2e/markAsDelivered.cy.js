const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");
const { productDetails } = require("../pages/productDetails");
const { shoppingCart } = require("../pages/shoppingCart");
const { payment } = require("../pages/payment");
const { orderSummary } = require("../pages/orderSummary");
const { paypalPopup } = require("../pages/paypalPopup");
const { orders } = require("../pages/orders");


beforeEach(() => {
   // Run the data:destroy command
   cy.exec('npm run data:destroy').then((result) => {
    cy.log(result.stdout);
  });

  // Run the data:import command
  cy.exec('npm run data:import').then((result) => {
    cy.log(result.stdout);
  });

  cy.visit("/login");
  cy.login("customer1")
  cy.fixture("products").as("product");
  cy.fixture("addresses").as("address");
  
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
})

it('Verify that Admin can mark order as delivered.', () => {
  // Paypal
  orderSummary.clickPaypal()
  cy.wait(5000)
  paypalPopup.login()
  cy.wait(5000)
  paypalPopup.pay()

  cy.wait(5000)

  orderSummary.checkStatusOrder(false)

  // Logout
  cy.wait(10000)
  homePage.logout()

  // Visit login page and log in as admin
  cy.visit("/login");
  cy.login("admin");

  // Navigate to Admin Menu and Orders page
  homePage.navigateAdminOrders()

  // Mark the order as delivered
  orders.navigateToOneSpecificOrder()
  orderSummary.clickDelivered()
  orderSummary.checkStatusOrder(true)
})

it('Verify that After marked as delivered once, do not allowed to change status of the order', () => {
  // Paypal
  orderSummary.clickPaypal()
  cy.wait(5000)
  paypalPopup.login()
  cy.wait(5000)
  paypalPopup.pay()

  cy.wait(5000)

  orderSummary.checkStatusOrder(false)

  // Logout
  cy.wait(10000)
  homePage.logout()

  // Visit login page and log in as admin
  cy.visit("/login");
  cy.login("admin");

  // Navigate to Admin Menu and Orders page
  homePage.navigateAdminOrders()

  // Mark the order as delivered
  orders.navigateToOneSpecificOrder()
  orderSummary.clickDelivered()
  orderSummary.checkStatusOrder(true)

  // Cannot change status
  orderSummary.verifyNoButtonToChangeStatus()
})

it('Verify that Admin can not mark delivered if the order has not yet paid', () => {
  // Logout
  homePage.logout()

  // Visit login page and log in as admin
  cy.visit("/login");
  cy.login("admin");

  // Navigate to Admin Menu and Orders page
  homePage.navigateAdminOrders()

  // Mark the order as delivered
  orders.navigateToOneSpecificOrder()
  orderSummary.verifyNoButtonToChangeStatus()
})