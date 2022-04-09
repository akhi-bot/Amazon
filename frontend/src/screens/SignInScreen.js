import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signIn } from "../redux/actions/userAction";

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
    userInfo
      ? redirect
        ? navigate(`/${redirect}`)
        : navigate("/")
      : navigate("/signin");
  }, [userInfo, navigate, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;
