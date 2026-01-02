import { useState } from "react";
import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";
import SearchForm from "../components/SearchForm";
import "./SearchPage.css";


function SearchPage() {
  //stores all search filter values
  const [filters, setFilters] = useState({
    type: "Any",
    minPrice: 0,
    maxPrice: 1500000,
    minBeds: "",
    maxBeds: "",
    postcode: "",
    dateFrom: null,
    dateTo: null,
});
  //stores filtered results
  const [results, setResults] = useState(propertiesData.properties);
  //update a single  filter value
  const handleFilterChange = (field, value) => {
  setFilters(prev => ({ ...prev, [field]: value }));
};



  return (
    <div>
      <h1>Property Search</h1>
    </div>
  );
}

export default SearchPage;
