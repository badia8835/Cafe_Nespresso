import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Col } from 'react-bootstrap';
import Header from './header';
import Footer from './footer';
import CafeCard from './cafeCard';
import './index.css';

const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

const App = () => {
  const [cafes, setCafes] = useState([]); // Initialize cafes state

  useEffect(() => {
    fetch(`${API_URL}/coffees`)
      .then(response => response.json())
      .then(data => {
        setCafes(data); // Store all cafes in the state
      })
      .catch(error => {
        console.error('An error occurred while fetching data.', error);
      });
  }, []);

  const handleAddCafe = newCafe => {
    // Update the state with the new cafe
    setCafes(prevCafes => [...prevCafes, newCafe]);
  };

  const handleDeleteCafe = cafeId => {
    // Update the state by removing the deleted cafe
    setCafes(prevCafes => prevCafes.filter(cafe => cafe.id !== cafeId));
  };

  return (
    <div>
      <Header onAddCafe={handleAddCafe} setCafes={setCafes} />
      <Container>
          {cafes.map(cafe => (
            <Col key={cafe.id}>
              <CafeCard
                pictureUrl={cafe.pictureUrl}
                name={cafe.name}
                description={cafe.description}
                id={cafe.id}
                onDeleteCafe={handleDeleteCafe}
              />
            </Col>
          ))}
       
      </Container>
      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
