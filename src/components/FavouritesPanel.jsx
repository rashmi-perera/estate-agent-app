import { useState } from "react";
import "./FavouritesPanel.css";
import propertiesData from "../data/properties.json";

function FavouritesPanel({ favourites, onAddFavourite }) {
  // Track when dragging a favourite item
  const [isDraggingFav, setIsDraggingFav] = useState(false);
  
  const handleAddDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.getData("source") !== "property") return;
    const propertyId = e.dataTransfer.getData("text/plain");
    const property = propertiesData.properties.find(
      (p) => p.id === propertyId
    );
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
            <div 
              key={fav.id} 
              className="fav-item"
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", fav.id);
                e.dataTransfer.setData("source", "favourite");
                e.dataTransfer.effectAllowed = "move";
                setIsDraggingFav(true);
              }}
              onDragEnd={() => setIsDraggingFav(false)}
            >
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