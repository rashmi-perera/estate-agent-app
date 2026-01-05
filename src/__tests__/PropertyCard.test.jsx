import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
/*Test 5*/
const mockProperty = {
  id: "prop1",
  type: "House",
  price: 750000,
  bedrooms: 3,
  location: "Petts Wood Road, Orpington BR5",
  picture: "images/prop1pic1small.jpg"
};

test("renders property card with type and price", () => {
  render(
    <MemoryRouter>
      <PropertyCard
        property={mockProperty}
        isFavourite={false}
        onAddFavourite={jest.fn()}
        onRemoveFavourite={jest.fn()}
      />
    </MemoryRouter>
  );

  expect(screen.getByText("House")).toBeInTheDocument();
  expect(screen.getByText("£750,000")).toBeInTheDocument();
});




