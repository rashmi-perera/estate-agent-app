import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PropertyDetails from "./pages/PropertyDetails";



function App() {

  // FAVOURITES STATE - manages the favourite properties list
  const [favourites, setFavourites] = useState([]);

  // Add to favourites (prevent duplicates)
  const addToFavourites = (property) => {
    // Check if property already exists in favourites
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  // Remove from favourites by ID
  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <SearchPage 
          favourites={favourites}
          onAddFavourite={addToFavourites}
          onRemoveFavourite={removeFromFavourites}
          onClearFavourites={clearFavourites}
          
          />
        }
        />
        <Route 
          path="/property/:id" 
          element={
          <PropertyDetails 
            favourites={favourites}
            onAddFavourite={addToFavourites}
            onRemoveFavourite={removeFromFavourites} 
          />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

