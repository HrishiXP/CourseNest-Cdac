// CardR.jsx
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CardR = ({ title, desc, btn, onEnroll }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>
        <Button onClick={onEnroll}>{btn}</Button>
      </Card.Body>
    </Card>
  );
};

export default CardR;
