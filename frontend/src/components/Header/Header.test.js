import Header from "./Header";
import { render, screen } from "@testing-library/react";

it('should have a header 1 with the text "Todo App"', () => {
  render(<Header />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Todo App"
  );
});
