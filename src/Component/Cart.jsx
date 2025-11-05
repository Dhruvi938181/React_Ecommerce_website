import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decrementQuantity, incrementQuantity, removeFromCart } from "./Cart/CartAction";

const Cart = () => {
  const cart = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const totalprice = cart.reduce((acc, item) => acc + Number(item.price) * (1 + (item.gst || 0) / 100) * item.quantity, 0);

  const discount = totalprice * 0.1;
  const finalTotal = totalprice - discount;

  if (!user) {
    return (
      <div className="container text-center  mb-5" style={{ marginTop: "120px" }}>
        <h2 className="mb-3">Please Sign In</h2>
        <p className="mb-4">You need to be signed in to view your shopping cart and checkout.</p>
        <button className="shop1 rounded-1 mb-3 fs-4" onClick={() => navigate("/signin")}>
          Sign In
        </button>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container text-center  mb-5" style={{ marginTop: "120px", minHeight: "27vh" }}>
        <h2>Your Cart is Empty !!</h2>
        <p>Add some products to your cart to see them here.</p>
        <Link to="/">
          <button className="btn btn-dark rounded-1 mb-3 fs-5 px-4 py-2">Go Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mb-5" style={{ marginTop: "120px" }}>
      <h1 className="fw-bold mb-4 text-center">Shopping Cart 🛒</h1>

      <div className="table-responsive border">
        <table className="table align-middle text-center">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">GST %</th>
              <th scope="col">Final Price</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {cart.map((el, i) => (
              <tr key={i} className="align-middle">
                <td className="text-start align-middle">
                  <span className="fw-bold d-lg-none me-2" style={{ marginLeft: "0px" }}>
                    Product:
                  </span>
                  <div className="d-flex align-items-center flex-wrap">
                    <img src={el.image} alt={el.name} className="img-fluid rounded" style={{ width: "70px", height: "70px", objectFit: "cover" }} />
                    <span className="fw-semibold ms-3">{el.name}</span>
                  </div>
                </td>

                <td className="text-start align-middle">
                  <span className="fw-bold d-lg-none me-2" style={{ marginLeft: "0px" }}>Qty:</span>
                  <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-outline-dark btn-sm me-2" onClick={() => dispatch(decrementQuantity(i))}>
                      −
                    </button>
                    <span>{el.quantity}</span>
                    <button className="btn btn-outline-dark btn-sm ms-2" onClick={() => dispatch(incrementQuantity(i))}>
                      +
                    </button>
                  </div>
                </td>

                <td className="text-start align-middle">
                  <span className="fw-bold d-lg-none me-2">Price:</span>₹{Number(el.price).toFixed(2)}
                </td>

                <td className="text-start align-middle">
                  <span className="fw-bold d-lg-none me-2">GST:</span>
                  {el.gst || 0}%
                </td>

                <td className="text-start align-middle">
                  {" "}
                  <span className="fw-bold d-lg-none me-2">Final:</span>₹{(Number(el.price) * (1 + (el.gst || 0) / 100) * el.quantity).toFixed(2)}
                </td>

                <td>
                  <button
                    onClick={() => dispatch(removeFromCart(i))}
                    className="btn btn-light border-0 rounded-circle d-flex justify-content-center align-items-center mx-auto"
                    style={{ width: "40px", height: "40px" }}>
                    <FiX size={18} color="#555" />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="6" className="text-end fw-semibold fs-5">
                Total (Before Discount): ₹{totalprice.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="text-end fw-semibold text-danger fs-5">
                Discount (10% OFF): −₹{discount.toFixed(2)}
              </td>
            </tr>
            <tr className="fw-bold fs-4 border-top">
              <td colSpan="6" className="text-end">
                Final Total: ₹{finalTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="shop1 rounded-2 me-3" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
        <button className="shop1 rounded-2  p-2" onClick={() => navigate("/")}>
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
