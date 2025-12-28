import "./PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img src={property.picture} alt={property.type} />
      <h3>{property.type}</h3>
      <p>£{property.price.toLocaleString()}</p>
      <p>{property.bedrooms} bedrooms</p>
      <p>{property.location}</p>
    </div>
  );
}

export default PropertyCard;

