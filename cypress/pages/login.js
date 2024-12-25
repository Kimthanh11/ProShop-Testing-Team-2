export const loginPage = {
    TXT_EMAIL : "#email",
    TXT_PASSWORD : "#password",
    BTN_SIGNIN :  '.btn.btn-primary',

    typeEmail(username){
        cy.get(this.TXT_EMAIL).type(username)
        return this;
    },

    typePassword(password){
        cy.get(this.TXT_PASSWORD).type(password)
        return this;
    },
    
    clickSignInButton(){
        cy.get(this.BTN_SIGNIN).click()
        return this;
    },

    clickRegisterButton(){
        cy.contains('a', 'Register').click()
        return this;
    }
}