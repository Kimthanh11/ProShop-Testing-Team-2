const { loginPage } = require("../pages/login");
const { homePage } = require("../pages/homepage");
const { productDetails } = require("../pages/productDetails");
const { shoppingCart } = require("../pages/shoppingCart");
const { payment } = require("../pages/payment");
const { orderSummary } = require("../pages/orderSummary");
const { paypalPopup } = require("../pages/paypalPopup");

beforeEach(() => {
    cy.visit("/login");
    cy.fixture("users").as("user");
    cy.fixture("products").as("product");
    cy.fixture("addresses").as("address");
  });
  
it("Order successfully with PayPal", function () {
  cy.visit("/login");
  cy.login("customer1")

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

      orderSummary.checkStatusOrder(false)
})