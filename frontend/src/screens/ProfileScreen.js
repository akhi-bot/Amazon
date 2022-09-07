import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../redux/actions/userAction";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Container, Form, Button } from "react-bootstrap";
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: loadingUpdate } = userUpdateProfile;

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch profile update
    if (password !== confirmPassword) {
      toast.error("password And Confirm Password Are Not Matched");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo?._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo?._id, user]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <Form onSubmit={submitHandler}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}

            <Form.Group className="mb-3" ControlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" ControlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" ControlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" ControlId="confirmPassword">
              <Form.Label>confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Button className="primary" type="submit">
                Update
              </Button>
            </div>
          </>
        )}
      </Form>
    </Container>
  );
};

export default ProfileScreen;
