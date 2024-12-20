export const registerPage = {
    TXT_NAME : "#name",    
    TXT_EMAIL : "#email",
    TXT_PASSWORD : "#password",
    TXT_CNFPASS : "#confirmPassword",
    BTN_REGISTER : ".btn.btn-primary",

    typeName(name){
        cy.get(this.TXT_NAME).type(name)
        return this;
    },

    typeEmail(email){
        cy.get(this.TXT_EMAIL).type(email)
        return this;
    },

    typePassword(password){
        cy.get(this.TXT_PASSWORD).type(password)
        return this;
    },

    typeConfirmPassword(confirmPassword){
        cy.get(this.TXT_CNFPASS).type(confirmPassword)
        return this;
    },
    
    clickRegisterButton(){
        cy.get(this.BTN_REGISTER).click()
        return this;
    },

    clickLoginButton(){
        cy.contains('a', 'Login').click()
        return this;
    }
}