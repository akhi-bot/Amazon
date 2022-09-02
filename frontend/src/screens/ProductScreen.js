import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { productDetails as detailsProduct } from "../redux/actions/productAction";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { addToCart } from "../redux/actions/cartAction";
const ProductScreen = (props) => {
  // const { id } = useParams();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  // useEffect(() => {
  //   dispatch(detailsProduct(id));
  // }, [dispatch, id]);
  useEffect(() => {
    dispatch(detailsProduct(slug));
  }, [dispatch, slug]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id));
    navigate(`/cart`);
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <Col md={6}>
            <img className="img-large" src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <>
                      {/* <ListGroup.Item className="">
                        <div>
                          <div className="">Qty</div>
                          <div className="">
                            <select ref={selectRef}>
                              {[...Array(product.countInStock)].map((x, i) => (
                                <option key={i} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </ListGroup.Item> */}
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
