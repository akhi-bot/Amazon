import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser, updateUser } from "../redux/actions/userAction";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from "../redux/constants/userConstants";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/user-list");
    }
    if (!user?.name || userId !== user?._id) {
      console.log(userId);
      dispatch(detailsUser(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setIsAdmin(user?.isAdmin);
      setIsSeller(user?.isSeller);
    }
  }, [dispatch, user, userId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isSeller }));
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit Product {userId}</title>
      </Helmet>
      <h1>Edit User {userId}</h1>

      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isSeller"
            label="Is Seller"
            checked={isSeller}
            onChange={(e) => setIsSeller(e.target.checked)}
          />

          <Form.Check
            type="checkbox"
            className="mb-3"
            id="isAdmin"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit" variant="primary">
              Update
            </Button>
            {loadingUpdate && <LoadingBox />}
          </div>
        </Form>
      )}
    </Container>
  );
};

export default UserEditScreen;
