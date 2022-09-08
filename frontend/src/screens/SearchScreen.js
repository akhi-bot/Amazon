import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import {
  productCategories,
  productSearch,
} from "../redux/actions/productAction";

const prices = [
  { name: "$1 to $50", value: "1-50" },
  { name: "$51 to $200", value: "51-200" },
  { name: "$201 to $1000", value: "201-1000" },
];
const ratings = [
  { name: "4stars & up", rating: 4 },
  { name: "3stars & up", rating: 3 },
  { name: "2stars & up", rating: 2 },
  { name: "1stars & up", rating: 1 },
];

const SearchScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSearchParams()[0].get("category") || "all";
  const query = useSearchParams()[0].get("query") || "all";
  const price = useSearchParams()[0].get("price") || "all";
  const rating = useSearchParams()[0].get("rating") || "all";
  const order = useSearchParams()[0].get("order") || "newest";
  const page = useSearchParams()[0].get("page") || 1;

  const { products: categories = [] } = useSelector(
    (state) => state.productCategories
  );
  const {
    loading,
    error,
    products: searchProducts,
    pages,
    countProducts,
  } = useSelector((state) => state.productSearch);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const filterOrder = filter.order || order;
    return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}`;
  };
  useEffect(() => {
    dispatch(productSearch({ category, query, price, rating, order, page }));
    dispatch(productCategories());
  }, [dispatch, category, rating, order, page, query, price]);

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    to={getFilterUrl({ category: c })}
                    className={c === category ? "text-bold" : ""}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? "text-bold" : ""}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={r.rating === Number(rating) ? "text-bold" : ""}
                  >
                    <Rating caption={` & up`} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: "all" })}
                  className={rating === "all" ? "text-bold" : ""}
                >
                  <Rating caption={` & up`} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && `: ${query}`}
                    {category !== "all" && `: ${category}`}
                    {price !== "all" && `: Price ${price}`}
                    {rating !== "all" && `: Rating ${rating} & up`}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) =>
                      navigate(getFilterUrl({ order: e.target.value }))
                    }
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="topRated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {searchProducts.length === 0 ? (
                <MessageBox variant="danger">No Product Found</MessageBox>
              ) : (
                <Row>
                  {searchProducts.map((product) => (
                    <Col className="mb-3" sm={6} lg={4} key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              )}
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchScreen;
