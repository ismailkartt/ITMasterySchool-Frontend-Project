import React from "react";
import "./event-card.scss";
import { Container } from "react-bootstrap";
import events from "../../helpers/data/events.json";
import EventCard from "./event-card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const UpcomingEvents = () => {

  const upcomingEvents = events.filter((event) => (
    new Date(event.date) > new Date()
  ))

  return (
    <div className="upcoming-events">
      <Container>
        <h2>
          <span className="prev"><FiChevronLeft /></span>
          <span>Upcoming Events</span>
          <span className="next"><FiChevronRight /></span>
        </h2>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next"
          }}
          modules={[Navigation]}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            }
          }
          }
        >
          {upcomingEvents.map((event)=>(
               <SwiperSlide> <EventCard key={event.id} {...event}/></SwiperSlide>   
            ))}
       
          
        </Swiper>
      </Container>
    </div>
  );
};

export default UpcomingEvents;
