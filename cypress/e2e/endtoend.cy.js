import { homePage } from "../pages/homepage"
import { loginPage } from "../pages/login";
import { payment } from "../pages/payment";
import {productDetails} from "../pages/productDetails"
import { shipping } from "../pages/shipping";
import { shoppingCart } from "../pages/shoppingCart";

beforeEach(() => {
    cy.fixture("users").as("user")
    cy.fixture("products").as("product")
    cy.fixture("addresses").as("address")
});

it("Successful buy product for John", () => {
    // Login
    cy.visit("/login");
    cy.get("@user").then((user) => {
    loginPage.typeEmail(user.customer1.email).typePassword(user.customer1.password).clickSignInButton() 
    homePage.checkDirectToHomePage(user.customer1.username)
    // Search for product
    cy.get("@product").then((product) => {
        // Search for a specific product and verify it appears in the search results
        homePage.searchProduct(product.cannon.name)
        .checkProductAppearedAfterSearch(product.cannon.name);

        // Select one product
        homePage.selectOneProduct(product.cannon.name)

        // Add product to cart
        productDetails.addToCart()

        // Proceed to checkout
        shoppingCart.proceedToCheckout()

        // Fill out payment and shipping details
        cy.get("@address").then((address) => {
            shipping
                .inputAddress(address.address)
                .inputCity(address.city)
                .inputPostalCode(address.postalCode)
                .inputCountry(address.country)
                .proceedToCheckout();
        });

        // Place the order
        payment.pay()

        // Verify order confirmation
    })
  })
})
