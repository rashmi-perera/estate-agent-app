import { useState } from "react";
import "./FavouritesPanel.css";
import propertiesData from "../data/properties.json";

function FavouritesPanel({
  favourites,
  onAddFavourite,
  onRemoveFavourite,
  onClearFavourites
}) {
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

  const handleRemoveDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.getData("source") !== "favourite") return;
    const favId = e.dataTransfer.getData("text/plain");
    if (favId) {
      onRemoveFavourite(favId);
    }
    setIsDraggingFav(false);
  };

  return (
    <>
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
          <>
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

                <button
                  onClick={() => onRemoveFavourite(fav.id)}
                  aria-label="Remove from favourites"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Clear All Button */}
            <button className="clear-btn" onClick={onClearFavourites}>
              Clear All
            </button>
          </>
        )}
      </div>

      <div
        className={`remove-zone ${isDraggingFav ? "visible" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleRemoveDrop}
      >
        🗑 Drag here to remove from favourites
      </div>
    </>
  );
}

export default FavouritesPanel;