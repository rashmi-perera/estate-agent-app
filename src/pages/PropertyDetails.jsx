import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "./PropertyDetails.css";

function PropertyDetails() {
  // Extract property ID from URL
  const { id } = useParams();

  // Find property by ID
  const property = propertiesData.properties.find((p) => p.id === id);

  // Handle invalid property ID
  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <div className="property-details">
      {/* Header */}
      <div className="details-header">
        <Link to="/" className="back-link">
          ← Back to Search
        </Link>
      </div>

      {/* Property title */}
      <h1>{property.type}</h1>
    </div>
  );
}

export default PropertyDetails;