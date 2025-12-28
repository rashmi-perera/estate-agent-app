import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";


function SearchPage() {
  return (
    <div>
      <h1>Property Search</h1>

      <div className="property-list">
        {propertiesData.properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;

