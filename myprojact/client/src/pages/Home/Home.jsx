import React, { useState } from "react";
import "./Home.scss";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import StartStyling from "../../components/StartStyling/StartStyling";

const Home = ({ response, setResponse, style, setStyle }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleStartStyling = () => {
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }
    if (!style) {
      setError("Please select a style.");
      return;
    }
    setError(""); // Clear any previous error if validation passes
  };

  return (
    <div className="home">
      <h1 className="home__heading">Ask the AI stylist</h1>
      <p className="home__description">Upload your clothes and let the AI stylist suggest your outfit.</p>
      {error && <div className="home__error">{error}</div>}
      
      <ImageUploader images={images} setImages={setImages} />
      
      <StartStyling
        style={style}
        setStyle={setStyle}
        images={images}
        response={response}
        setResponse={setResponse}
        onStart={handleStartStyling}  // Ensure validation before starting
      />
    </div>
  );
};

export default Home;