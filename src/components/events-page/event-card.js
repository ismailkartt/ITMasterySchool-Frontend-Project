import React from 'react'
import "./upcoming-events.scss"
import { Card } from 'react-bootstrap'

const EventCard = () => {
  return (
    <Card className="course-card">
        <Card.Body>
          <div className="image"> 
          <Card.Img variant="top" src={`/images/courses/${image}`} alt={title} className='img-fluid'/>
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>
            <div><FiUser/> {user}</div>
            <div><FiTrendingUp/> {rating}</div>
            <div><FiDollarSign/> {price}</div>
          </Card.Subtitle>
        </Card.Body>
      </Card>
  )
}

export default EventCard