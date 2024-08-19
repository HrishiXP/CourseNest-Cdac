import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function TopSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <>
      <Slider>
        <div className="wdt SlideCarosel">
          <img className="img" alt="pic1" src={"assets/img-1.jpg"} />
        </div>
        <div className="wdt SlideCarosel">
          <img className="img" alt="pic1" src={"assets/img-2.jpg"} />
        </div>
      
      </Slider>
     
    </>
  );
}

export default TopSlider;
