import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";

test("Testing works!", () => {
  const { getByText, getByRole } = render(<App />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  screen.findByRole("img");
  fireEvent.click(screen.getByRole("button", { name: "button-prev" }));
  screen.findByRole("img");
  fireEvent.click(screen.getByRole("button", { name: "button-next" }));
  screen.findByRole("img");
});
