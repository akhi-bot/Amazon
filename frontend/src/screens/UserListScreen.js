import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { deleteUser, listUser } from "../redux/actions/userAction";
import {
  USER_DELETE_RESET,
  USER_DETAILS_RESET,
} from "../redux/constants/userConstants";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, user } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, success: successDelete } = userDelete;
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    } else {
      dispatch(listUser());
    }
  }, [dispatch, successDelete]);

  const editHandler = (user) => {
    navigate(`/admin/user/${user._id}/edit`);
  };
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "Yes" : "No"}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      editHandler(user);
                    }}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      deleteHandler(user);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
