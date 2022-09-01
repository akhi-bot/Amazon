import React from "react";
import { Alert } from "react-bootstrap";

const MessageBox = (props) => {
  const { variant, children } = props;
  return <Alert variant={variant || "info"}>{children}</Alert>;
};

export default MessageBox;
