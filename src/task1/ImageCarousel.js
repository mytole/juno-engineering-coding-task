import React, { useState, useEffect, useRef } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { fetchImage } from "../api/index";

import "./ImageCarousel.css";

//custom hook to access previous index
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const ImageCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const prevIndex = usePrevious(currentIndex);

  useEffect(() => {
    if (!images[currentIndex]) {
      const fetchImageAsync = async () => {
        const fetchedImage = await fetchImage(currentIndex);

        if (fetchedImage) {
          const updatedImages = [...images];
          updatedImages.push({ url: fetchedImage });
          setImages(updatedImages);
        }
      };
      fetchImageAsync().catch((err) => {
        //index not found on api
        if (currentIndex === images.length && prevIndex !== 0) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(images.length - 1);
        }
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container">
      <div className="prev-btn nav-btn">
        <button aria-label="button-prev" onClick={handlePrev}>
          <NavigateBeforeIcon />
        </button>
      </div>
      <div className="img-wrapper">
        {images[currentIndex] ? (
          <img
            key={images[currentIndex].url}
            className="current-image"
            src={images[currentIndex]?.url}
          ></img>
        ) : (
          <span>LOADING</span>
        )}
      </div>
      <div className="next-btn nav-btn">
        <button aria-label="button-next" onClick={handleNext}>
          <NavigateNextIcon />
        </button>
      </div>
    </div>
  );
};
export default ImageCarousel;
