import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Card, Button } from "react-bootstrap";
const Product = (props) => {
  const { product } = props;
  return (
    <Card>
      {/* <Link to={`product/${product.slug}`}> */}
      <Link to={`product/${product._id}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        {/* <Link to={`product/${product.slug}`}> */}
        <Link to={`product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>
          {" "}
          <strong>${product.price}</strong>
        </Card.Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
