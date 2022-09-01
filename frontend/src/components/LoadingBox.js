import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingBox = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
      {/* <i className="fas fa-spinner fa-spin"></i>Loading... */}
    </Spinner>
  );
};

export default LoadingBox;
