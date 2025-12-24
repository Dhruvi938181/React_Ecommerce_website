import { motion } from 'framer-motion';
import { useLocation, useNavigate } from "react-router-dom";
const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from location state (if coming from Checkout)
  const { cart, form, totalprice, discount, finalTotal } = location.state || {};

  // ✅ Fallback to localStorage if not passed through state
  const storedTotal = Number(totalprice) || Number(localStorage.getItem("totalprice")) || 0;
  const storedDiscount = Number(discount) || Number(localStorage.getItem("discount")) || 0;
  const storedFinal =
    Number(finalTotal) || Number(localStorage.getItem("finalTotal")) || storedTotal - storedDiscount;

  // ✅ Function to clear cart & wishlist on going back
  const handleBackToShopping = () => {
    // Clear cart and wishlist from localStorage
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    // Optional: If your Redux also holds these, you can refresh the page to reset state
    window.location.href = "/"; // This ensures UI reflects empty cart/wishlist
  };

  if (!cart) {
    return (
      <div className="container text-center mt-5">
        <h2>No order found!</h2>
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}> 
    <div className="container mb-5" style={{ marginTop: "120px" }}>
      <h1 className="text-center mb-4">Order Bill</h1>

      {/* Customer Info */}
      <div className="border p-4 rounded mb-3">
        <h4>Customer Info</h4>
        <p><b>Name:</b> {form?.name}</p>
        <p><b>Email:</b> {form?.email}</p>
        <p>
          <b>Address:</b> {form?.address}, {form?.city}, {form?.state} - {form?.zip}
        </p>
        <p><b>Payment Method:</b> {form?.paymentMethod}</p>
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded mb-3">
        <h4>Order Summary</h4>
        {cart.map((item, i) => (
          <div key={i} className="d-flex justify-content-between mb-2">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>
              ₹{(item.price * item.quantity * (1 + (item.gst || 0) / 100)).toFixed(2)}
            </span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <span>Total</span>
          <span>₹{storedTotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between text-danger">
          <span>Discount</span>
          <span>−₹{storedDiscount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold border-top pt-2">
          <span>Final Total</span>
          <span>₹{storedFinal.toFixed(2)}</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button className="shop1 btn p-2" onClick={handleBackToShopping}>
          Back to Shopping
        </button>
      </div>
    </div></motion.div>
  );
};

export default Bill;
