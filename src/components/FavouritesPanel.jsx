import "./FavouritesPanel.css";
import propertiesData from "../data/properties.json";

function FavouritesPanel({ favourites, onAddFavourite }) {
  
  // Handle dropping property into favourites
  const handleAddDrop = (e) => {
    e.preventDefault();
    
    
    if (e.dataTransfer.getData("source") !== "property") return;
    
    // Get property ID and find the property
    const propertyId = e.dataTransfer.getData("text/plain");
    const property = propertiesData.properties.find(
      (p) => p.id === propertyId
    );
    
    // Add to favourites if found
    if (property) {
      onAddFavourite(property);
    }
  };

  return (
    <div 
      className="favourites-box"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleAddDrop}
    >
      <h3>My Favourites ({favourites.length})</h3>
      
      {favourites.length === 0 ? (
        <p className="empty-message">
          Drag properties here or click the heart button
        </p>
      ) : (
        <div>
          {favourites.map((fav) => (
            <div key={fav.id} className="fav-item">
              <span>
                {fav.type} – £{fav.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavouritesPanel;