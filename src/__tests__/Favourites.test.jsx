import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import App from "../App";

describe("Favourites Functionality - Critical Operations", () => {

  // TEST 1: Add to Favourites
  test("adds property to favourites when heart button clicked", () => {
    render(<App />);

    expect(
      screen.getByText(/my favourites \(0\)/i)
    ).toBeInTheDocument();

    const heartButtons = screen.getAllByRole("button", {
      name: /toggle favourite/i
    });
    fireEvent.click(heartButtons[0]);

    expect(
      screen.getByText(/my favourites \(1\)/i)
    ).toBeInTheDocument();

    const favouritesPanel = screen.getByText(/my favourites/i).parentElement;
    const favItem = within(favouritesPanel).getByText(/£/);
    expect(favItem).toBeInTheDocument();
  });

  // TEST 2: Prevent Duplicate Favourites
  test("does not add same property twice (toggle removes instead)", () => {
    render(<App />);

    const heartButtons = screen.getAllByRole("button", {
      name: /toggle favourite/i
    });

    fireEvent.click(heartButtons[0]);
    expect(
      screen.getByText(/my favourites \(1\)/i)
    ).toBeInTheDocument();

    fireEvent.click(heartButtons[0]);
    expect(
      screen.getByText(/my favourites \(0\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/drag properties here/i)
    ).toBeInTheDocument();
  });

  // TEST 3: Remove from Favourites
  test("removes property from favourites when remove button is clicked", () => {
    render(<App />);

    const heartButtons = screen.getAllByRole("button", {
      name: /toggle favourite/i
    });

    // Add favourite first
    fireEvent.click(heartButtons[0]);
    expect(
      screen.getByText(/my favourites \(1\)/i)
    ).toBeInTheDocument();

    // Click remove (×) button
    const removeBtn = screen.getByRole("button", {
      name: /remove from favourites/i
    });
    fireEvent.click(removeBtn);

    // Favourite should be removed
    expect(
      screen.getByText(/my favourites \(0\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/drag properties here/i)
    ).toBeInTheDocument();
  });

  // TEST 4: Clear All Favourites
  test("clears all favourites when Clear All button is clicked", () => {
    render(<App />);

    const heartButtons = screen.getAllByRole("button", {
      name: /toggle favourite/i
    });

    // Add multiple favourites
    fireEvent.click(heartButtons[0]);
    fireEvent.click(heartButtons[1]);
    fireEvent.click(heartButtons[2]);

    expect(
      screen.getByText(/my favourites \(3\)/i)
    ).toBeInTheDocument();

    // Clear all favourites
    const clearAllBtn = screen.getByRole("button", {
      name: /clear all/i
    });
    fireEvent.click(clearAllBtn);

    expect(
      screen.getByText(/my favourites \(0\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/drag properties here/i)
    ).toBeInTheDocument();
  });

});
