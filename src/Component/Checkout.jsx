import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "",
    cardNumber: "",
    cvv: "",
  });

  const [discount, setDiscount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {};
    if (checkoutData.items) setCart(checkoutData.items);
    setTotalPrice(checkoutData.subtotal || 0);
    setDiscount(checkoutData.discount || 0);
  }, []);

  const finalTotal = totalprice - discount;

  // ✅ Handle all form inputs normally
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Special handler for card number formatting
  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits
    value = value.slice(0, 16); // limit to 16 digits
    // add space after every 4 digits
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setForm({ ...form, cardNumber: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.paymentMethod
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all required fields!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // ✅ Validate Card Details if Payment = Card
    if (form.paymentMethod === "Card") {
      const cardDigits = form.cardNumber.replace(/\s/g, ""); // remove spaces
      if (cardDigits.length !== 16 || form.cvv.length !== 4) {
        Swal.fire({
          icon: "error",
          title: "Invalid Card Details!",
          text: "Card number must be 16 digits and CVV must be 4 digits.",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
    }

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      showConfirmButton: false,
      timer: 1200,
    });

    // ✅ Save for Bill page (without changing structure)
    localStorage.setItem("totalprice", totalprice);
    localStorage.setItem("discount", discount);
    localStorage.setItem("finalTotal", finalTotal);
    localStorage.setItem("billCart", JSON.stringify(cart));
    localStorage.setItem("billForm", JSON.stringify(form));

    // ✅ Navigate to Bill
    navigate("/bill", {
      state: { cart, form, totalprice, discount, finalTotal },
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}> 
    <div className="container mt-5 mb-5" style={{ marginTop: "120px" }}>
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row">
        {/* Billing Form */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <h4>Billing Details</h4>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInput}
                className="form-control"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInput}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleInput}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Zip</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleInput}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <h4 className="mt-4">Payment Method</h4>
            <div className="mb-3">
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleInput}
                className="form-select"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Card">Card</option>
              </select>
            </div>

            {form.paymentMethod === "Card" && (
              <>
                <div className="mb-3">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleCardNumber}
                    placeholder="1234 5678 9012 3456"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleInput}
                    maxLength="4"
                    placeholder="1234"
                    className="form-control"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-success w-100 mt-3">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="border p-3 rounded">
            <h4>Order Summary</h4>
            {cart.map((item, i) => (
              <div key={i} className="d-flex justify-content-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
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
          </div>
        </div>
      </div>
    </div></motion.div>
  );
};

export default Checkout;
