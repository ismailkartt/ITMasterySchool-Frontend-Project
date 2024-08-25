import React from "react";
import "./slider.scss";
import { Carousel, Image } from "react-bootstrap";
import slides from "../../../helpers/data/slider.json";

const Slider = () => {
  return (
    <Carousel fade className="slider">
      {slides.map((slides) => (
        <Carousel.Item key={slides.id}>
          <Image src={`/images/slider/${slides.image}`} alt={slides.image} className= "img-fluid"/>
          <Carousel.Caption>
            <h3>{slides.title}</h3>
            <p>{slides.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
