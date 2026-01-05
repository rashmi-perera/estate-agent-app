import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

  // Track main image and selected tab
  const [mainImage, setMainImage] = useState(
    property.pictures?.[0] || property.picture
  );

  // Reset image and tab when property changes
  useEffect(() => {
    setMainImage(property.pictures?.[0] || property.picture);
  }, [property]);

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

      {/* Layout grid */}
      <div className="property-layout-grid">
        
        <div className="gallery-column">
          {/* Image gallery */}
          <div className="gallery-wrapper">
            <div className="gallery">
              <img
                src={`/${mainImage}`}
                alt={property.type}
                className="main-image"
              />

              {/* Thumbnails */}
              <div className="thumbnails">
                {property.pictures?.map((img, index) => (
                  <img
                    key={index}
                    src={`/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${
                      img === mainImage ? "active" : ""
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;