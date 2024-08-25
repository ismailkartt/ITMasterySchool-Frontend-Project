import React from 'react'
import { Card } from 'react-bootstrap'

const CourseCard = ({image, title, user, rating, price}) => {
  return (
    <Card className="course-card">
        <Card.Img variant="top" src={`/images/courses/${image}`} alt={title}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>
            <div>{user}</div>
            <div>{rating}</div>
            <div>{price}</div>
          </Card.Subtitle>
        </Card.Body>
      </Card>
  )
}

export default CourseCard