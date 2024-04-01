import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
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

it("should delete the task on button click", async () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText("Add a task");
  const buttonElement = screen.getByText("Add");
  const task = `Test task ${Math.random()}`;
  userEvent.type(inputElement, task);
  userEvent.click(buttonElement);
  // find the li element containing the task
  const liElement = (await screen.findByText(task)).parentElement;
  // find the delete button
  // the button is the second child of the li element
  const deleteButton = liElement.children[1];
  userEvent.click(deleteButton);
  await waitFor(() => {
    expect(screen.queryByText(task)).not.toBeInTheDocument();
  });
});
