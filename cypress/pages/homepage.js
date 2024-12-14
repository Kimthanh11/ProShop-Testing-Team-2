export const homePage = {
    USERNAME: "#username",
    
    checkDirectToHomePage(username){
        cy.get(this.USERNAME).should('have.text', username)
    }
}