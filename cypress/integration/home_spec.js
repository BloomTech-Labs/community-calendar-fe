describe("home page", () => {
    it("can visit page", () => {
        cy.visit("localhost:3000");
    })

    it("navbar renders", () => {
        cy.get(".navbar");
    });

    it("navbar has link to events page", () => {
        cy.get(".navbar").should("contain", "[href=\"\\\"]");
    });
});