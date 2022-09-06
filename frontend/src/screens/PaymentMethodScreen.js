import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartAction";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const PaymentMethodScreen = () => {
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }

    if (paymentMethod) {
      setPaymentMethodName(paymentMethod);
    }
  }, [shippingAddress, navigate, paymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodName));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Container className="small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form className="form" onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="paypal"
              value="Paypal"
              label="Paypal"
              required
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="stripe"
              value="Stripe"
              label="Stripe"
              required
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PaymentMethodScreen;
