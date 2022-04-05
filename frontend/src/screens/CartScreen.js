import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  let qty = +useSearchParams()[0].get("qty") || 1;

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => () => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div className="">
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock)].map((x, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="submit"
                      onClick={removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal({cartItems.reduce((acc, c) => acc + c.qty, 0)} items):
                ${cartItems.reduce((acc, c) => acc + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
