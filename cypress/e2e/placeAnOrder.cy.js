import { loginPage } from "../pages/login";
import { orderSummary } from "../pages/orderSummary";
import { payment } from "../pages/payment";
import { productDetails } from "../pages/productDetails";
import { shipping } from "../pages/shipping";
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
    cy.fixture("users").as("user");
    cy.fixture("products").as("product");
    cy.fixture("addresses").as("address");

    // Login
    cy.visit("/login");
    cy.get("@user").then((user) => {
        loginPage.typeEmail(user.customer1.email)
            .typePassword(user.customer1.password)
            .clickSignInButton();
    });
});

it('Verify a product is added to the cart when a single in-stock product is selected', function () {
    cy.get("@product").then((product) => {
        cy.addProductToCart(product.cannon.name);
    });
    cy.verifyCartCount(1);
});

it('Verify multiple products are added to the cart when all selected products are in stock', function () {
    cy.get("@product").then((product) => {
        cy.addProductToCart(product.cannon.name);
        cy.addProductToCart(product.sony.name);
    });
    cy.verifyCartCount(2);
});

it('Verify product is not added to the cart when attempting to add an out-of-stock product to the cart', function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.amazon.name);
    });
    productDetails.disableAddToCart(); // Assert button is disabled
});

it('Verify Quantity Selection is Restricted to Available Stock Options in the Cart', function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.sony.name);
        productDetails.checkLimitQuantity(product.sony.countInStock)
    });
});

it('Verify the product is removed from the cart when the remove button is clicked', function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.sony.name);
        productDetails.addToCart()
    });
    cy.get("@product").then((product) => {
        shoppingCart.removeProduct(product.sony.name)
    });
    shoppingCart.verifyCartEmpty()
});

it('Verify the user can proceed to the next step when all shipping details are entered', function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.sony.name);
        productDetails.addToCart()
    });
    shoppingCart.proceedToCheckout()
    cy.get("@address").then((address) => {
                shipping
                    .inputAddress(address.address)
                    .inputCity(address.city)
                    .inputPostalCode(address.postalCode)
                    .inputCountry(address.country)
                    .proceedToCheckout();
            });
    payment.checkDirectToPayment()
});

it('Verify an error message is shown when invalid or incomplete shipping details are entered', function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.airpods.name);
        productDetails.addToCart()
    });
    shoppingCart.proceedToCheckout()
    cy.get('input:invalid').each(($input) => {
        cy.wrap($input).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');
    });
});

it('Verify the user can proceed to the next step when all payment details are entered', function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.sony.name);
        productDetails.addToCart()
    });
    shoppingCart.proceedToCheckout()
    cy.get("@address").then((address) => {
                shipping
                    .inputAddress(address.address)
                    .inputCity(address.city)
                    .inputPostalCode(address.postalCode)
                    .inputCountry(address.country)
                    .proceedToCheckout();
            });
    payment.checkDirectToPayment()
    payment.pay()
    orderSummary.checkDirectToOrderSummary()
});

it.only("Verify the order is successfully placed when all required details are provided correctly.", function () {
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.sony.name);
        productDetails.addToCart()
    });
    shoppingCart.proceedToCheckout()
    cy.get("@address").then((address) => {
                shipping
                    .inputAddress(address.address)
                    .inputCity(address.city)
                    .inputPostalCode(address.postalCode)
                    .inputCountry(address.country)
                    .proceedToCheckout();
            });
    payment.pay()
    orderSummary.clickPlaceOrder()
    orderSummary.checkDirectToOrderSummary()
    orderSummary.clickPlaceOrder()
    orderSummary.checkPlacedOrder()
})