import { BASE_URL, card, modal_btn_close } from '../../src/utils/constans';

describe("logging in and creating an order", () => {
  before(() => {
    let email = "lesiv_anna@mail.ru";
    let password = "123qwer";
    cy.intercept("POST", "**/orders").as("addOrder");
    cy.viewport(1400, 1200);
    cy.visit(`${BASE_URL}/login`);
    cy.get("input[name=email]").type(`${email}{enter}`);
    cy.get("input[name=password]").type(`${password}{enter}`);
  });

  it("drag and drop ingredients and create an order", () => {
    cy.contains("Соберите бургер");
    cy.get("[class^=burger-constructor_section__]").as("constructor");
    const dataTransfer = new DataTransfer();
    cy.get(card)
      .first()
      .trigger("dragstart", {
        dataTransfer,
      });
    cy.get("@constructor").trigger("drop", {
      dataTransfer,
    });
    cy.get(card).last().trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor").trigger("drop", {
      dataTransfer,
    });
    cy.get("button").contains("Оформить заказ").click();
    cy.wait("@addOrder");
    cy.contains("идентификатор заказа");
    cy.get(modal_btn_close).click();
    cy.contains("Выберите булку для бургера");
  });
});