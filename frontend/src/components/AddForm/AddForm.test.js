import AddForm from "./AddForm";
import { render, screen } from "@testing-library/react";

it("should have a form element", () => {
  render(<AddForm />);
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});

it("should have an input with 'Add a task' placeholder", () => {
  render(<AddForm />);
  const inputElement = screen.getByPlaceholderText("Add a task");
  expect(inputElement).toBeInTheDocument();
});

it("should have a button with 'Add' text", () => {
  render(<AddForm />);
  const buttonElement = screen.getByText("Add");
  expect(buttonElement).toBeInTheDocument();
});
