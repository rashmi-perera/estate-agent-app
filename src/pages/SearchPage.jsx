import { useState } from "react";
import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";
import SearchForm from "../components/SearchForm";
import "./SearchPage.css";
import FavouritesPanel from "../components/FavouritesPanel";



const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


// Extract postcode area from location string
const extractPostcode = (location) => {
  const match = location.match(/\b([A-Z]{1,2}\d{1,2})\b/i);
  return match ? match[1].toUpperCase() : "";
};


function SearchPage({ favourites, onAddFavourite, onRemoveFavourite, onClearFavourites }) {
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

  //Apply all search filter
  const handleSearch = () => {
    const filtered = propertiesData.properties.filter(property => {

      //property type filter
      if (filters.type !== "Any" && property.type !== filters.type) return false;
 
      //price range filter
      if (property.price < filters.minPrice) return false;
      if (property.price > filters.maxPrice) return false;

      //Bedroom filter
      if (filters.minBeds && property.bedrooms < filters.minBeds) return false;
      if (filters.maxBeds && property.bedrooms > filters.maxBeds) return false;

      //postcode filter
      if (filters.postcode) {
        const propPostcode = extractPostcode(property.location);
        if (propPostcode !== filters.postcode) return false;
      }

      //date added filtrer
      if (filters.dateFrom || filters.dateTo) {
        const monthIndex = monthNames.indexOf(property.added.month);
        const propDate = new Date(
          property.added.year,
          monthIndex,
          property.added.day
        );

        if (filters.dateFrom && propDate < filters.dateFrom.toDate()) return false;
        if (filters.dateTo && propDate > filters.dateTo.toDate()) return false;
      }

      return true;
    });

    setResults(filtered);
  };


  //clear search and reset filters
  const handleClear = () => {
    setFilters({
      type: "Any",
      minPrice: 0,
      maxPrice: 1500000,
      minBeds: "",
      maxBeds: "",
      postcode: "",
      dateFrom: null,
      dateTo: null,
    });
    setResults(propertiesData.properties);
  };

  
  const isFavourite = (id) => {
    return favourites.some(fav => fav.id === id);
  };




  return (
    <div  className="search-page-container">
      <h1>Property Search</h1>
      <div className="serch-form-section">
      

      {/*render search form and filtered property results*/}
      <SearchForm
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      </div>
      <div className="favourites-section">
      {/* Favourites Box */}
      
      <FavouritesPanel
        favourites={favourites}
        onAddFavourite={onAddFavourite}
        onRemoveFavourite={onRemoveFavourite}
        onClearFavourites={onClearFavourites}
      />
      </div>


    <div className="property-list">
      {results.length === 0 ? (
        <p className="no-results">
          No properties match your search criteria.
        </p>
      ) : (
        results.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property}
            isFavourite={isFavourite(property.id)}
            onAddFavourite={onAddFavourite}
            onRemoveFavourite={onRemoveFavourite}
            
          />
        ))
      )}
    </div>


    </div>
  );
}

export default SearchPage;
