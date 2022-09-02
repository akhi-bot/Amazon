import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = props;

  const addToCartHandler = () => {
    dispatch(addToCart(product._id));
    navigate(`/cart`);
  };
  return (
    <Card>
      <Link to={`product/${product.slug}`}>
        {/* <Link to={`product/${product._id}`}> */}
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`product/${product.slug}`}>
          {/* <Link to={`product/${product._id}`}> */}
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>
          {" "}
          <strong>${product.price}</strong>
        </Card.Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {product.countInStock === 0 ? (
          <Button variant="secondary" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={addToCartHandler} variant="primary">
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
