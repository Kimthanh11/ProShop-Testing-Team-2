import { loginPage } from "../pages/login";
import { homePage } from "../pages/homepage";
import { profile } from "../pages/profile";
import { orderSummary } from "../pages/orderSummary";
import { payment } from "../pages/payment";
import { shoppingCart } from "../pages/shoppingCart";
import { shipping } from "../pages/shipping";
import { productDetails } from "../pages/productDetails";

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
});


it('Verify the order history is empty when no orders have been placed', function () {
    cy.visit("/login");
    cy.login("customer1")
    homePage.navigateToProfile()
    profile.checkDirectToProfile()
    cy.get('th').should('not.exist')
});

it('Verify the details of a specific order are displayed correctly when an order is selected', function () {
    cy.visit("/login");
    cy.login("customer1")

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
    orderSummary.clickPlaceOrder()
    
    cy.get('h1').contains('Order').invoke('text').then((text) => {
        let orderNumber = text.replace('Order ', '');
        Cypress.env('orderNumber', orderNumber);
        homePage.navigateToProfile()
        let orderId = Cypress.env('orderNumber')
        profile.navigateToDetailedOrder(orderId)
    })

    //Verify order details
    cy.get('.list-group-item').first().within(() => {
        // Check Shipping details
        cy.contains('h2', 'Shipping').should('exist');
        cy.contains('p', 'Name: John Doe').should('exist');
        cy.contains('a', 'john@email.com').should('exist');
        cy.contains('p', `Address:${this.address.address}, ${this.address.city} ${this.address.postalCode}, ${this.address.country}`).should('exist');
        cy.contains('div', 'Not Delivered').should('exist');
      });

      // Check Payment Method
    cy.get('.list-group-item').contains('h2', 'Payment Method').scrollIntoView().should('exist').parent().within(() => {
        cy.contains('p', 'Method: PayPal').should('exist');
        cy.contains('div', 'Not Paid').should('exist');
      });
  
      // Check Order Items
      cy.get('.list-group-item').contains('h2', 'Order Items').scrollIntoView().should('exist').parent().within(() => {
        cy.contains('a', 'Sony Playstation 5').should('exist');
        cy.contains('div', '1 x $399.99 = $399.99').should('exist');
      });
});
