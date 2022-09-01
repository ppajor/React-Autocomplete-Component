import { render, screen } from "@testing-library/react";
//import App from './App';
import Autocomplete from "./components/Autocomplete";

test("renders component and finds input", () => {
  render(<Autocomplete />);
  const input = screen.getByTestId("input-search");
  expect(input).toBeInTheDocument();
});

// test("Test ability to fetch API", () => {
//   render(<Autocomplete />);
//   const input = screen.getByTestId("input-search");
// });
