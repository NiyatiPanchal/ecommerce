import React from "react";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };
  return (
    <>
      <Card style={{ width: "16rem", margin: "0 auto" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{addElipsis(product.name, 20)}</Card.Title>
          <Card.Text>{addElipsis(product.description, 150)}</Card.Text>
          <Card.Text>₹{product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
