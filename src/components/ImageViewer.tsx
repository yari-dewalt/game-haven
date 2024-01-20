import "../styles/ImageViewer.css";
import { useState, useEffect } from "react";
import backArrowIcon from "../assets/arrow_back.svg";
import forwardArrowIcon from "../assets/arrow_forward.svg";
import ImageNav from "./ImageNav";

function ImageViewer({ images })
{
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  function changeIndex(value) {
    setCurrentIndex(value);
  }
  
  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function handlePrev() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  return (
   <div className="image-viewer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img key={currentIndex} className={"image-viewer-image"} src={images[currentIndex].image}></img>
      <button id="back-arrow" className={`image-viewer-button ${isHovered ? "shown" : ''}`} onClick={handlePrev}>
        <img src={backArrowIcon} alt="back arrow"></img>
      </button>
      <button id="forward-arrow" className={`image-viewer-button ${isHovered ? "shown" : ''}`} onClick={handleNext}>
        <img src={forwardArrowIcon} alt="forward arrow"></img>
      </button>
      <ImageNav images={images} currentIndex={currentIndex} changeIndex={changeIndex} isHovered={isHovered}/>
   </div>
  )
}

export default ImageViewer;
