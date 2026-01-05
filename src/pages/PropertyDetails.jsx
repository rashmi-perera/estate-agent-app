import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import propertiesData from "../data/properties.json";
import "./PropertyDetails.css";

function PropertyDetails({ favourites, onAddFavourite, onRemoveFavourite }) {
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

  // Check if property is in favourites
  const isFavourite =
    favourites?.some((fav) => fav.id === property.id) || false;

  // Toggle favourite
  const handleFavouriteClick = () => {
    if (isFavourite) {
      onRemoveFavourite(property.id);
    } else {
      onAddFavourite(property);
    }
  };

  return (
    <div className="property-details">
      {/* Header */}
      <div className="details-header">
        <Link to="/" className="back-link">
          ← Back to Search
        </Link>

        {/* Favourite button with ICON */}
        <button
          className={`fav-btn-details ${isFavourite ? "active" : ""}`}
          onClick={handleFavouriteClick}
          aria-label="Toggle favourite"
        >
          <img
            src={
              isFavourite
                ? "/icons/heart-filled.png"
                : "/icons/heart-outline.png"
            }
            alt="Favourite"
            className="heart-img-details"
          />
          <span className="fav-text">
            {isFavourite ? "Remove Favourite" : "Add Favourite"}
          </span>
        </button>
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

          {/* Property info */}
          <div className="property-info">
            <p>
              <strong>Price:</strong> £{property.price.toLocaleString()}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Tenure:</strong> {property.tenure}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;