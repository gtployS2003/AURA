import React, { useState, useEffect } from "react";
import "./MyOutfits.scss";
import {
  getFavoriteOutfits,
  removeFavoriteOutfit,
  getFavImages,
} from "../../utils/indexDB";
import removeIcon from "../../asset/close.svg";

function MyOutfits() {
  const [outfits, setOutfits] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    // Fetch favorite outfits and images
    const fetchFavoriteOutfits = async () => {
      try {
        const favoriteOutfits = await getFavoriteOutfits();
        setOutfits(favoriteOutfits);
      } catch (error) {
        console.log("Failed to fetch favorite outfits:", error);
        setError("Failed to fetch favorite outfits.");
      }
    };

    const fetchFavImages = async () => {
      try {
        const favImages = await getFavImages();
        setImages(favImages);
      } catch (error) {
        console.log("Failed to fetch favorite images:", error);
        setError("Failed to fetch favorite images.");
      }
    };

    fetchFavoriteOutfits();
    fetchFavImages();
  }, []);

  // Handle remove outfit
const handleRemoveOutfit = async (outfitId) => {
  try {
    await removeFavoriteOutfit(outfitId);
    // Update outfits in state after removal
    setOutfits((prevOutfits) =>
      prevOutfits.filter((outfit) => outfit.id !== outfitId)
    );
    setError("Outfit removed successfully!"); // Show success message
  } catch (error) {
    console.error("Failed to remove outfit:", error);
    setError("Failed to remove outfit. Please try again.");
  }
};


  // Find the src of images stored in IndexedDB
  const getImageSrc = (imageId) => {
    const image = images.find((img) => img.id === imageId);
    return image ? image.url : "";
  };

  if (outfits.length === 0) {
    return (
      <div className="my-outfits__empty">
        <h1 className="outfit-heading">My Outfits</h1>
        <p>No outfits found. Start creating and saving your favorite outfits!</p>
      </div>
    );
  } else {
    return (
      <div className="my-outfits">
        <h1 className="outfit-heading">My Outfits</h1>
        <div className="outfit-gallery">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="outfit-card">
              <div className="outfit-card__header">
                <h2 className="outfit-card__text outfit-card__heading">
                  Outfit {outfit.id}
                </h2>
                <img
                  src={removeIcon}
                  alt="remove button"
                  onClick={() => handleRemoveOutfit(outfit.id)}
                  className="icon"
                />
              </div>
              <div className="outfit-card__images">
                {outfit.clothes.map((id) => (
                  <img
                    className="outfit-card__image"
                    key={id}
                    src={getImageSrc(id)}
                    alt={id}
                  />
                ))}
              </div>
              <p className="outfit-card__text">Score: {outfit.score}</p>
              <p className="outfit-card__text">{outfit.considerations}</p>
            </div>
          ))}
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }
}

export default MyOutfits;
