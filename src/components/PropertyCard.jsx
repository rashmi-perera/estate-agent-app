import "./PropertyCard.css";
import { Link } from "react-router-dom";

// Displays a single property card in the search results
function PropertyCard({
  property,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite
}) {
  // Starts drag to add property to favourites
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", property.id);
    e.dataTransfer.setData("source", "property");
    e.dataTransfer.effectAllowed = "move";
  };

  //// Adds or removes property when heart icon is clicked
  const handleFavouriteClick = (e) => {
    e.stopPropagation();// Prevent drag when clicking heart
    // If property is already a favourite,remove it. Otherwise,add it to favourites
    if (isFavourite) {
      onRemoveFavourite(property.id);
    } else {
      onAddFavourite(property);
    }
  };
  

  return (
    <div
      className="property-card"
      draggable
      onDragStart={handleDragStart}// Allows dragging to favourites
    >
      {/* Property thumbnail image */}
      <img
        src={`/${property.picture}`}
        alt={property.type}
        className="property-image"
      />

      <div className="property-info">
        <div className="property-header">

          {/* Displays property type (House / Flat) */}
          <h3>{property.type}</h3>

          {/* Button to add or remove favourite */}
          <button
            className={`fav-btn ${isFavourite ? "active" : ""}`}
            onClick={handleFavouriteClick}
            aria-label="Toggle favourite"
          >
            {/* Shows filled heart if favourite,outline if not */}
            <img
              src={
                isFavourite
                  ? "/icons/heart-filled.png"
                  : "/icons/heart-outline.png"
              }
              alt="Favourite"
              className="heart-img"
            />
          </button>
        </div>
        {/* Displays property price */}
        <p className="property-price">
          £{property.price.toLocaleString()}
        </p>
        {/* Short description */}
        <p className="property-desc">
          <strong>{property.bedrooms}</strong>-bedroom  {property.type.toLowerCase()} located in{" "}
          <strong>{property.location.split(",")[0] }</strong>  
        </p>
        
        <Link to={`/property/${property.id}`} className="view-link">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
