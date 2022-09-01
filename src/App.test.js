import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Autocomplete from "./components/Autocomplete";

describe("Autocomplete component", () => {
  it("Test if message is shown when no results", async () => {
    render(<Autocomplete />);
    const input = screen.getByTestId("input-search");
    fireEvent.click(input);

    fireEvent.change(input, { target: { value: "bxnmc" } });
    // expect(input.value).toBe("bxnmc");
    let msg;
    await waitFor(() => {
      msg = screen.getByTestId("noresults-message");
    });

    expect(msg).toBeInTheDocument();
  });
});
