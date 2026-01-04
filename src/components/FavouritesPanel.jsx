import "./FavouritesPanel.css";

function FavouritesPanel({ favourites }) {
  return (
    <div className="favourites-box">
      <h3>My Favourites ({favourites.length})</h3>
      
      {favourites.length === 0 ? (
        <p className="empty-message">
          No favourites yet
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