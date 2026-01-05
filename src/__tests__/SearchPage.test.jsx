import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../pages/SearchPage";
import { BrowserRouter } from "react-router-dom";

// ---- MOCK PROPS ----
const mockFavourites = [];
const mockAddFavourite = jest.fn();
const mockRemoveFavourite = jest.fn();
const mockClearFavourites = jest.fn();

const renderSearchPage = () => {
  render(
    <BrowserRouter>
      <SearchPage
        favourites={mockFavourites}
        onAddFavourite={mockAddFavourite}
        onRemoveFavourite={mockRemoveFavourite}
        onClearFavourites={mockClearFavourites}
      />
    </BrowserRouter>
  );
};

describe("SearchPage component", () => {

  //  TEST 6 — Page renders
  test("renders Property Search heading", () => {
    renderSearchPage();
    expect(
      screen.getByRole("heading", { name: /property search/i })
    ).toBeInTheDocument();
  });

  // TEST 7 — Filter by property type (House)
  test("filters properties by type House", () => {
    renderSearchPage();

    // Open Property Type select
    fireEvent.mouseDown(screen.getByLabelText(/property type/i));

    // Select House OPTION (not text)
    const listbox = screen.getByRole("listbox");
    fireEvent.click(within(listbox).getByRole("option", { name: "House" }));

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // At least one house card rendered
    expect(screen.getAllByRole("heading", { name: "House" }).length)
      .toBeGreaterThan(0);
  });

  //  TEST 8 — Filter by postcode
  test("filters properties by postcode BR6", () => {
    renderSearchPage();

    fireEvent.mouseDown(screen.getByLabelText(/postcode area/i));
    const listbox = screen.getByRole("listbox");
    fireEvent.click(within(listbox).getByRole("option", { name: "BR6" }));

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText(/Crofton Road/i)).toBeInTheDocument();
  });

  // TEST 9 — Multiple criteria (House + Min Bedrooms)
  test("filters by type and minimum bedrooms", () => {
    renderSearchPage();

    fireEvent.mouseDown(screen.getByLabelText(/property type/i));
    fireEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "House" })
    );

    fireEvent.mouseDown(screen.getByLabelText(/min bedrooms/i));
    fireEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "3" })
    );

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getAllByRole("heading", { name: "House" }).length)
      .toBeGreaterThan(0);
  });

  // TEST 10 — Clear button
  test("clear button resets search", () => {
    renderSearchPage();

    fireEvent.mouseDown(screen.getByLabelText(/property type/i));
    fireEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "Flat" })
    );

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(
      screen.getByRole("heading", { name: /property search/i })
    ).toBeInTheDocument();
  });

});
