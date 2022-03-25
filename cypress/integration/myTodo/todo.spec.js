describe("todos", () => {
  // before every test -> do callback
  beforeEach(() => {
    cy.visit("/"); // go / = baseUrl
  });

  // 한개씩 작성 (X) -> this is E2E test!!
  it("user can add. check and delete todos", () => {
    cy.get("form input").type("TEST").type("{enter}");
    cy.get("form input").type("TEST2").type("{enter}");

    cy.findByText("TEST").should("exist");
    cy.findByText("TEST2").should("exist");

    cy.get("h4")
      .findByText(/you have 3 todos left/i)
      .should("exist");

    // check 이후 남은 갯수 테스팅
    cy.get(`[data-cy=todo-TEST]`).within(() => {
      cy.findByRole("checkbox").check();
    });
    cy.get("h4")
      .findByText(/you have 2 todos left/i)
      .should("exist");
  });
});

// 이렇게 작성 -> 너무 작은 단위...
// // ADD TODO
// it("add Todo", () => {
//   // 1) type something in input
//   // 2) submit
//   cy.findByRole("textbox", { id: "title" }).type("TEST").type("{enter}");

//   // 3) check typed string in app
//   cy.findByText("TEST").should("exist");
// });

// // REMOVE TODO (only => 해당 테스트만 시행토록 해줌)
// it.only("remove todo", () => {
//   cy.findByRole("textbox", { id: "title" }).type("TEST").type("{enter}");
//   cy.findByRole("textbox", { id: "title" }).type("TEST2").type("{enter}");

//   cy.wait(1000);

//   // cypress always click 1st button
//   // cy.get(".todo")
//   //   .findByRole("button", { name: /remove/i })
//   //   .click();

//   // get(selector)를 통해 어떤 버튼을 클릭할지에 대해 지정해줘야 한다.

//   // cy.get("ul > li:nth-child(2) > button").click();
//   // but, 이렇게 작성하는 것은 바람직하지 못함!! -> 당장 stlyed-components만 써도...
//   // testID를 사용!! -> Dataset으로 넣어두면 됨
//   // cy.findByTestId("todo-TEST").findByRole("button").click();

//   // within ->
//   cy.get(`[data-cy=todo-TEST]`).within(() => {
//     cy.findByRole("button").click();
//   });

//   // cy.findByText("TODO").should("not.exist");
//   // 2nd로 입력한 TEST가 삭제 되므로
//   cy.findByText("TEST").should("not.exist");
// });
