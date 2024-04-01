import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("should add a task on form submit", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("Add a task");
  const buttonElement = screen.getByText("Add");
  const task = `Test task ${Math.random()}`;
  userEvent.type(inputElement, task);
  userEvent.click(buttonElement);
  expect(await screen.findByText(task)).toBeInTheDocument();
});
