import React from 'react'
import "./upcoming-events.scss"
import { Card } from 'react-bootstrap'
import { FiClock , FiMapPin } from 'react-icons/fi'

const EventCard = ({image, title, time , location}) => {
  return (
    <Card className="event-card">
        <Card.Body>
          <div className="image"> 
          <Card.Img variant="top" src={`/images/events/${image}`} alt={title} className='img-fluid'/>
          </div>
          <Card.Subtitle>
            <div><FiClock/> {time}</div>
            <div><FiMapPin/> {location}</div>
          </Card.Subtitle>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
  )
}

export default EventCard