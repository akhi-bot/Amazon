import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../redux/actions/userAction";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const { userInfo } = userSignIn;

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch profile update
  };
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={user.name || ""}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                value={user.email || ""}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" id="password" placeholder="Enter password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input type="text" id="password" placeholder="Enter password" />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileScreen;
