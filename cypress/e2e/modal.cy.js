import {BASE_URL, card, modal_btn_close} from '../../src/utils/constans';

describe("open modal", () => {
  before(() => {
    cy.viewport(1400, 1200);
    cy.visit(`${BASE_URL}`);
  });

  it("open modal with ingredient", () => {
    cy.get(card).first().click();
    cy.contains("Детали ингредиента");
    cy.get(modal_btn_close).click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});