import React, { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'


const AdminList = () => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const loadData = () => { 

     }

  return (
    <Container>
        <Card>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between'>
                    <span>Admin List</span>
                    <Button>New Admin</Button>
                </Card.Title>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default AdminList