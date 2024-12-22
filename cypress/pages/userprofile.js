export const profilePage = {
    TXT_Name : "#name",
    TXT_Email : "#email",
    TXT_Password: "#password",
    TXT_CnfPassword: "#confirmPassword",
    BTN_Update: ".btn-primary",

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
        cy.get(this.TXT_CnfPassword).type(confirmPassword)
        return this;
    },
    
    clickUpdateButton(){
        cy.get(this.BTN_Update).click()
        return this;
    }

}