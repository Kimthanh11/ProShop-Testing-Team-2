import { homePage } from "../pages/homepage"
import { loginPage } from "../pages/login";

beforeEach(() => {
    cy.fixture("users").as("user")
    cy.fixture("products").as("product")
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
        

        // Proceed to checkout

        // Fill out payment and shipping details

        // Place the order

        // Verify order confirmation
    })
  })
})
