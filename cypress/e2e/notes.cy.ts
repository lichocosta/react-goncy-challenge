describe("Notes app", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows a placeholder when no todos are found", () => {
    localStorage.setItem("todos", "[]");

    cy.visit("/");

    cy.contains("No notes!");
  });

  it("shows a todo for each todo in localStorage", () => {
    const todos = [
      {
        id: "nota",
        title: "Practice React",
        lastEdited: "07/09/2022",
        archived: false,
        content: "More and more and more",
        categories: ["random"],
      },
    ];

    localStorage.setItem("todos", JSON.stringify(todos));

    cy.visit("/");

    cy.get(`[data-testid="todo"]`).should("have.length", todos.length);
  });
});
