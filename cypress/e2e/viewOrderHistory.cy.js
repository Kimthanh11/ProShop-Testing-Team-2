import { loginPage } from "../pages/login";
import { homePage } from "../pages/homepage";
import { profile } from "../pages/profile";

beforeEach(() => {
    cy.fixture("users").as("user");
    cy.fixture("products").as("product");
    cy.fixture("addresses").as("address");
});


it('Verify the order history is empty when no orders have been placed', function () {
    cy.visit("/login");
        cy.get("@user").then((user) => {
            loginPage.typeEmail(user.empty.email)
                .typePassword(user.empty.password)
                .clickSignInButton();
        });
    homePage.navigateToProfile()
    cy.get('div.dropdown-menu.show') // Target the dropdown
    .find('a.dropdown-item[href="/profile"]') // Find the "Profile" link
    .click({ force: true }); // Force the click if needed
    profile.checkDirectToProfile()
});

it.only('Verify the details of a specific order are displayed correctly when an order is selected', function () {
    cy.visit("/login");
        cy.get("@user").then((user) => {
            loginPage.typeEmail(user.customer1.email)
                .typePassword(user.customer1.password)
                .clickSignInButton();
        });

    homePage.navigateToProfile()
    cy.get('div.dropdown-menu.show') // Target the dropdown
    .find('a.dropdown-item[href="/profile"]') // Find the "Profile" link
    .click({ force: true }); // Force the click if needed
    profile.checkDirectToProfile()
    profile.navigateToDetailedOrder("6756f44e3292c56f24e029bc")

    // Check name
    // Check email
    // Check address
    // Check price
});
