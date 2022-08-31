import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import { signOut } from "./redux/actions/userAction";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignInScreen from "./screens/SignInScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignIn);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazon</Navbar.Brand>
              </LinkContainer>
            </Container>
            <Container>
              <Link to="/cart?">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name.split(" ")[0]}{" "}
                    <i className="fas fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/order-history">Order History</Link>
                    </li>
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signOutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/product-list">Products</Link>
                    </li>
                    <li>
                      <Link to="/order-list">Orders</Link>
                    </li>
                    <li>
                      <Link to="/user-list">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
            </Container>
          </Navbar>
          {/* <div>
            <Link className="brand" to="/">
              amazon
            </Link>
          </div> */}
          {/* <Container>
            <Link to="/cart?">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name.split(" ")[0]}{" "}
                  <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/order-history">Order History</Link>
                  </li>
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/product-list">Products</Link>
                  </li>
                  <li>
                    <Link to="/order-list">Orders</Link>
                  </li>
                  <li>
                    <Link to="/user-list">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </Container> */}
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id">
                <Route index element={<ProductScreen />} />
                <Route path="edit" element={<ProductEditScreen />} />
              </Route>
              <Route path="/cart">
                <Route index element={<CartScreen />} />
                <Route path=":id" element={<CartScreen />} />
              </Route>
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/order-history" element={<OrderHistoryScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/user/:id/edit" element={<UserEditScreen />} />
                <Route path="/product-list" element={<ProductListScreen />} />
                <Route path="/order-list" element={<OrderListScreen />} />
                <Route path="/user-list" element={<UserListScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <footer className="text-center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
