import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './cafecard.css'

const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

function CafeCard(props) {
    const handleDelete = () => {
        fetch(`${API_URL}/coffees/${props.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {

                props.setCafes(prevCafes => prevCafes.filter(cafe => cafe.id !== props.id));
            })
            .catch(error => {
                console.error('An error occurred while deleting.', error);
            })
            .finally(() => {

                window.location.reload();
            });
    };


    return (
        <Card className="cafe-card"> {/* Add the "cafe-card" class */}
            <Card.Img variant="top" src={props.pictureUrl} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Button variant="primary" onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default CafeCard;
