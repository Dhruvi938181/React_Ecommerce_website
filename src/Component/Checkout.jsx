import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { removeFromCart } from "./Cart/CartAction";

const Checkout = () => {
  const cart = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!user) {
    return (
      <div className="container text-center mt-5 mb-5">
        <h2 className="mb-3">Please Sign In</h2>
        <button className="btn btn-dark" onClick={() => navigate("/signin")}>
          Sign In
        </button>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container text-center mt-5 mb-5">
        <h2>Your Cart is Empty!</h2>
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          Go Shopping
        </button>
      </div>
    );
  }

  const totalprice = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * (1 + (item.gst || 0) / 100) * item.quantity,
    0
  );
  const discount = totalprice * 0.1;
  const finalTotal = totalprice - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const { name, email, address, city, state, zip } = form;

    if (!name || !email || !address || !city || !state || !zip) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill all billing details before placing the order.",
        confirmButtonColor: "#92614c",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      text: "Thank you for shopping with us. Your order is confirmed.",
      confirmButtonColor: "#92614c",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      if (dispatch) dispatch(removeFromCart());
      navigate("/bill", {
        state: { cart, form, totalprice, discount, finalTotal },
      });
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
    });
  };

  return (
    <div className="container mb-5" style={{ marginTop: "120px" }}>
      <h1 className="text-center mb-4">Checkout</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h4>Billing Information</h4>
          <form>
            <input
              className="form-control mb-2"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
            />
            <input
              className="form-control mb-2"
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="ZIP"
              name="zip"
              value={form.zip}
              onChange={handleChange}
            />
            <select
              className="form-select"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </form>
        </div>

        <div className="col-md-6 mb-4">
          <h4>Order Summary</h4>
          <div className="border p-3 rounded">
            {cart.map((item, i) => (
              <div key={i} className="d-flex justify-content-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹
                  {(
                    item.price *
                    item.quantity *
                    (1 + (item.gst || 0) / 100)
                  ).toFixed(2)}
                </span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>₹{totalprice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-danger">
              <span>Discount</span>
              <span>−₹{discount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold border-top pt-2">
              <span>Final Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
