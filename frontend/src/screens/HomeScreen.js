import Product from "../components/Product";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productAction";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <div className="products">
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </div>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
