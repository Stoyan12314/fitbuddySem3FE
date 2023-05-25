describe("Register Test", () => {
  before(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("should display the registration form", () => {
    cy.get("form").should("be.visible");
  });

  it("should fail with invalid input", () => {
    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("User");
    cy.get("#email").type("testuser@test.com");
    cy.get("#password").type("testpassword");
    cy.get("select[name=role]").select("");
    cy.get('button.login-btn[type="submit"]').click();

    cy.get(".login-popup").should("be.visible");
  });

  it("should register with correct input", () => {
    cy.get("#firstName").clear().type("Test");
    cy.get("#lastName").clear().type("User");
    cy.get("#email").clear().type("testuser@test.com");
    cy.get("#password").clear().type("testpassword");
    cy.get("select[name=role]").select("CUSTOMER");
    cy.get('button.login-btn[type="submit"]').click();

    cy.url().should("include", "/Login");
  });
});
