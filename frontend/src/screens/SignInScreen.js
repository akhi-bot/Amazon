import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signIn } from "../redux/actions/userAction";
import { Helmet } from "react-helmet-async";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = useSearchParams()[0].get("redirect");
  const navigate = useNavigate();
  const { userInfo, error, loading } = useSelector((state) => state.userSignIn);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signIn(email, password));
  };

  useEffect(() => {
    userInfo && (redirect ? navigate(`/${redirect}`) : navigate("/"));
  }, [userInfo, navigate, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Form className="form" onSubmit={submitHandler}>
        <h1 className="my-3">Sign In</h1>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button className="primary" type="submit">
            Sign In
          </Button>
        </div>
        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInScreen;
