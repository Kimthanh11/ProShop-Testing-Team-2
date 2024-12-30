import {registerPage} from '../pages/register.js'
import {loginPage} from '../pages/login.js'
import {homePage} from '../pages/homepage.js'
import {profile} from '../pages/profile.js'
import { productDetails } from '../pages/productDetails.js';
import { shoppingCart } from '../pages/shoppingCart.js';
import { shipping } from '../pages/shipping.js';
import { payment } from '../pages/payment.js';
import { orderSummary } from '../pages/orderSummary.js';

describe('UI/UX Tests', () => {
  beforeEach(() => {
    cy.fixture('users').as('user');
    cy.fixture('products').as('product');
    cy.fixture('addresses').as('address');
  });

  it('UI_001 Verify UI/UX of Register screen', function () {
    cy.visit('/register');
    cy.contains('h1', 'Register').should('exist');
    cy.get(registerPage.TXT_NAME).should('exist');
    cy.get(registerPage.TXT_EMAIL).should('exist');
    cy.get(registerPage.TXT_PASSWORD).should('exist');
    cy.get(registerPage.TXT_CNFPASS).should('exist');
    cy.get(registerPage.BTN_REGISTER).should('exist');
    cy.get('a').contains('Login').should('exist');
  });

  it('UI_002 Verify UI/UX of Sign in screen', function () {
    cy.visit('/login');
    cy.contains('h1', 'Sign In').should('exist');
    cy.get(loginPage.TXT_EMAIL).should('exist');
    cy.get(loginPage.TXT_EMAIL).should('exist');
    cy.get(loginPage.BTN_SIGNIN).should('exist');
    cy.get('a').contains('Register').should('exist');
  });

  it('UI_003 Verify UI/UX of user Homepage screen', function () {
    cy.visit('/login');
    cy.login("customer1")
    cy.visit('/');
    cy.get('.navbar').within(() => {
        cy.get('.navbar-brand').should('exist').and('have.attr', 'href', '/');
        cy.get('.navbar-brand img').should('exist').and('have.attr', 'alt', 'ProShop');
        cy.get('input[placeholder="Search Products..."]').should('exist');
        cy.get('button').contains('Search').should('exist');
        cy.get('a').contains('Cart').should('exist');
        cy.get('.dropdown').contains("John Doe").should('exist');
      });
    cy.get('.carousel').should('exist');
    cy.contains('h1', 'Latest Products').should('exist');
    cy.get('.product-title').should('exist');
  });

  it('UI_004 Verify UI/UX of Admin Homepage screen', function () {
    cy.visit('/login');
    cy.login("admin")
    cy.visit('/');
    cy.get('.navbar').within(() => {
        cy.get('.navbar-brand').should('exist').and('have.attr', 'href', '/');
        cy.get('.navbar-brand img').should('exist').and('have.attr', 'alt', 'ProShop');
        cy.get('input[placeholder="Search Products..."]').should('exist');
        cy.get('button').contains('Search').should('exist');
        cy.get('a').contains('Cart').should('exist');
        cy.get('.dropdown').contains("Admin User").should('exist');
        cy.get('#adminmenu').should('exist')
        cy.get(homePage.BTN_ADMIN).click()
        cy.get(homePage.BTN_PRODUCT).should('exist');
        cy.get(homePage.BTN_ORDER).should('exist');
        cy.get(homePage.BTN_USER).should('exist');
      });
    cy.get('.carousel').should('exist');
    cy.contains('h1', 'Latest Products').should('exist');
    cy.get('.product-title').should('exist');
  });

  it('UI_005 Verify UI/UX of Profile screen', function () {
    cy.visit('/login');
    cy.login("customer1");
    cy.visit('/profile');
    cy.contains('h2', 'User Profile').should('exist');
    cy.get(profile.INPUT_NAME).should('exist');
    cy.get(profile.INPUT_EMAIL).should('exist');
    // cy.get(profile.CURRENT_PASSWORD).should('exist')
    cy.get(profile.INPUT_PASSWORD).should('exist');
    cy.get(profile.INPUT_CONFIRM_PASSWORD).should('exist');
    cy.get(profile.BTN_UPDATE).should('exist');
    cy.contains('h2', 'My Orders').should('exist');
    cy.get('table').within(() => {
      cy.contains('th', 'ID').should('exist');
      cy.contains('th', 'DATE').should('exist');
      cy.contains('th', 'TOTAL').should('exist');
      cy.contains('th', 'PAID').should('exist');
      cy.contains('th', 'DELIVERED').should('exist');
    });
  });

  it('UI_006 Verify UI/UX of Product Details screen', function () {
    cy.visit('/login');
    cy.login("customer1");
    cy.get("@product").then((product) => {
            cy.searchAndSelectProduct(product.sony.name);
        })
    cy.contains('a', 'Go Back').should('exist');
    cy.get('img').should('exist');
    cy.contains('h3', 'Sony Playstation 5').should('exist');
    cy.get('.rating').should('exist');
    cy.get('.card').within(() => {
      cy.contains('.list-group-item', 'Price:').should('exist');
      cy.contains('.list-group-item', 'Status:').should('exist');
      cy.contains('.list-group-item', 'Qty').should('exist');
      cy.get('select.form-control').should('exist');
      cy.contains('button', 'Add To Cart').should('exist');
    });
    cy.contains('h2', 'Reviews').should('exist');
    cy.contains('h2', 'Write a Customer Review').should('exist');
    cy.get(productDetails.INPUT_RATING).should('exist');
    cy.get(productDetails.INPUT_COMMENT).should('exist');
    cy.get(productDetails.BTN_REVIEW).should('exist');
  });

  it('UI_007 Verify UI/UX of Cart screen', function () {
    cy.visit('/login');
    cy.login("customer1");
    cy.get("@product").then((product) => {
        cy.searchAndSelectProduct(product.sony.name);
        productDetails.addToCart()
    })
    cy.contains('h1', 'Shopping Cart').should('exist');
    // Verify the product details in the first .list-group-item
    cy.get('.list-group-item').eq(0).within(() => {
        cy.get('img').should('exist');
        cy.contains('a', 'Sony Playstation 5').should('exist');
        cy.contains('.col-md-2', '$399.99').should('exist');
        cy.get('select.form-control').should('exist');
        cy.get('button').should('exist'); // Verify the delete button
    });
    
    // Verify the subtotal in the second .list-group-item
    cy.get('.list-group-item').eq(1).within(() => {
        cy.contains('h2', 'Subtotal (1) items').should('exist');
        cy.contains('$399.99').should('exist');
    });
    cy.get(shoppingCart.BTN_CHECKOUT).should('exist');
  });

  it('UI_008 Verify UI/UX of Shipping screen', function () {
    cy.visit('/login');
    cy.login("customer1");
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
    cy.contains('h1', 'Shipping').should('exist');
    cy.get(shipping.INPUT_ADDRESS).should('exist');
    cy.get(shipping.INPUT_CITY).should('exist');
    cy.get(shipping.INPUT_POSTALCODE).should('exist');
    cy.get(shipping.INPUT_COUNTRY).should('exist');
    cy.get(shipping.BTN_CHECKOUT).should('exist');
  });

  it('UI_009 Verify UI/UX of Select Payment screen', function () {
    cy.visit('/login');
    cy.login("customer1");
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
    cy.contains('h1', 'Payment Method').should('exist');
    cy.contains('legend', 'Select Method').should('exist');
    cy.get('input[type="radio"]').should('exist');
    cy.contains('button', 'Continue').should('exist');
  });

  it.only('UI_010 Verify UI/UX of Order Summary screen', function () {
    cy.visit('/login');
    cy.login("customer1");
    // Search for another product
    cy.get("@product").then((product) => {
        // Search for a specific product and verify it appears in the search results
        homePage.searchProduct(product.sony.name)
        .checkProductAppearedAfterSearch(product.sony.name);
  
        // Select one product
        homePage.selectProduct(product.sony.name);
  
        // Add the searched product to cart
        productDetails.addToCart()
  
        // Proceed to checkout
        shoppingCart.proceedToCheckout()
      })
    // Fill out shipping address
    cy.inputAddress()
    // Enter payment details and place the order
    payment.pay()
    cy.contains('h2', 'Order Summary').should('exist');
    cy.contains('h2', 'Shipping').should('exist');
    cy.contains('h2', 'Payment Method').should('exist');
    cy.contains('h2', 'Order Items').should('exist');
    cy.contains('a', 'Sony Playstation 5').should('exist');
    cy.contains('h2', 'Order Summary').should('exist');
    cy.contains('div', 'Items').should('exist');
    cy.contains('div', 'Shipping').should('exist');
    cy.contains('div', 'Tax').should('exist');
    cy.contains('div', 'Total').should('exist');
    cy.get(orderSummary.BTN_PLACE_ORDER).should('exist');
  });
});