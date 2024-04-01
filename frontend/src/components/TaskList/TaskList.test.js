import TaskList from "./TaskList";
import { render, screen } from "@testing-library/react";

it("should display No tasks message when there are no tasks", () => {
  render(<TaskList tasks={[]} />);
  expect(screen.getByText("No tasks")).toBeInTheDocument();
});

it("should display tasks", () => {
  render(
    <TaskList
      tasks={[
        { _id: 1, title: "Task 1" },
        { _id: 2, title: "Task 2" },
      ]}
    />
  );
  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});
