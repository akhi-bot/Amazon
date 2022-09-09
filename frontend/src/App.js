import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Navbar,
  NavDropdown,
  Button,
  Container,
  Nav,
  Badge,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./components/AdminRoute";
import "react-toastify/dist/ReactToastify.css";
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
import { useEffect, useState } from "react";
import { productCategories } from "./redux/actions/productAction";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignIn);
  const { products: categoriesProduct = [] } = useSelector(
    (state) => state.productCategories
  );
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    dispatch(productCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div
        className={`d-flex flex-column site-container ${
          sidebarIsOpen && "active-cont"
        }`}
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars" />
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>amazon</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/order-history">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        to="#signout"
                        onClick={signOutHandler}
                        className="dropdown-item"
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link to="/signin" className="nav-link">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/product-list">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/order-list">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/user-list">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={`${
            sidebarIsOpen && "active-nav"
          } side-navbar d-flex justify-content-between flex-wrap flex-column`}
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categoriesProduct.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              {/* <Route path="/product/:id"> */}
              <Route path="/product/:slug">
                <Route index element={<ProductScreen />} />
                <Route path="edit" element={<ProductEditScreen />} />
              </Route>
              <Route path="/cart">
                <Route index element={<CartScreen />} />
                {/* <Route path=":id" element={<CartScreen />} /> */}
              </Route>

              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route element={<PrivateRoute />}>
                <Route path="/order-history" element={<OrderHistoryScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
              </Route>
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard" element={<DashboardScreen />} />
                <Route path="user/:id/edit" element={<UserEditScreen />} />
                <Route path="product-list" element={<ProductListScreen />} />
                <Route path="/admin/order-list" element={<OrderListScreen />} />
                <Route path="/admin/user-list" element={<UserListScreen />} />
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
