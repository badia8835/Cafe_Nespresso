import React, { useState } from 'react';
import { Container, Navbar, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'

const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

function Header(props) {
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleAddItem = () => {
        // Get the form values
        const imageLink = document.getElementById('imageLink').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;


        const newItem = {
            pictureUrl: imageLink,
            name: name,
            description: description,
        };


        fetch(`${API_URL}/coffees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then(response => response.json())
            .then(data => {

                props.setCafes(prevCafes => [...prevCafes, data]);

                handleModalClose();
            })
            .catch(error => {
                console.error('An error occurred while adding.', error);
            });
    };

    return (
        <Container>
            <Navbar expand="lg" className="navbar-custom">
                <Navbar.Brand href="#index"><h1>Caftagram</h1></Navbar.Brand>
                <Button variant="primary" onClick={handleModalOpen}>Ajouter un article</Button>
            </Navbar>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un nouvel article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>lien de l'image</Form.Label>
                            <Form.Control type="URL" id="imageLink" placeholder="URL de l'image" />
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" id="name" placeholder="Nom du café" />
                            <Form.Label>description</Form.Label>
                            <Form.Control type="text" id="description" placeholder="description" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={handleAddItem}>Ajouter</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Header;
