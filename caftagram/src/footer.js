import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'; // Import your custom CSS file

function Footer() {
    return (
        <Container>
            <Navbar expand="lg" className="footer"> {/* Add the "footer" class */}
                <Navbar.Brand as="h3">
                    2023 © travail réalisé par Joelle, Badia et Mélanie dans le cadre d'un travail d'école
                </Navbar.Brand>
            </Navbar>
        </Container>
    );
}
  export default Footer;