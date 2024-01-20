import "../styles/ImageNav.css";

function ImageNav({ images, currentIndex, changeIndex, isHovered })
{
  return (
    <div className={`image-nav ${isHovered ? "shown": ''}`}>
      {images.map((image, index) =>
        <button key={index} className={`image-nav-circle ${index == currentIndex ? "selected" : ''} ${isHovered ? " shown" : ''}`} onClick={() => changeIndex(index)}></button>
      )}
    </div>
  )
}

export default ImageNav;
