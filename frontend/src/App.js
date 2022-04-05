import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              {" "}
              amazon
            </Link>
          </div>
          <div>
            <Link to="/cart?">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart">
              <Route index element={<CartScreen />} />
              <Route path=":id" element={<CartScreen />} />
            </Route>
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
