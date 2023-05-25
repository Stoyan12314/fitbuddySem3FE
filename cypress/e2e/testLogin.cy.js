describe("Login Test", () => {
  before(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should display the login form", () => {
    cy.get("#email").should("be.visible");
  });

  it("should fail with wrong credentials", () => {
    cy.get("#email").type("testemail@test.com");

    cy.get("#password");
    cy.get("#password").type("wrongpassword");
    cy.get("button.login-btn").click();

    cy.get(".popupStyle").should("be.visible");
  });

  it("should login with correct credentials", () => {
    cy.get("#email").clear().type("correctemail@test.com");
    cy.get("#password").clear().type("correctpassword");
    cy.get("button.login-btn").click();

    cy.url().should("include", "/OverviewExercises");
    cy.get(".popupStyle").should("not.exist");
  });
});
