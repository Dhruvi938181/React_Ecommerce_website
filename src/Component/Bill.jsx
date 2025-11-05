import { useLocation, useNavigate } from "react-router-dom";

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, form, totalprice, discount, finalTotal } = location.state || {};

  if (!cart) {
    return (
      <div className="container text-center mt-5">
        <h2>No order found!</h2>
        <button className="btn btn-dark" onClick={() => navigate("/")}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="container  mb-5" style={{marginTop:"120px"}}>
      <h1 className="text-center mb-4">Order Bill</h1>

      <div className="border p-4 rounded mb-3">
        <h4>Customer Info</h4>
        <p><b>Name:</b> {form.name}</p>
        <p><b>Email:</b> {form.email}</p>
        <p><b>Address:</b> {form.address}, {form.city}, {form.state} - {form.zip}</p>
        <p><b>Payment Method:</b> {form.paymentMethod}</p>
      </div>

      <div className="border p-4 rounded mb-3">
        <h4>Order Summary</h4>
        {cart.map((item, i) => (
          <div key={i} className="d-flex justify-content-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity * (1 + (item.gst||0)/100)).toFixed(2)}</span>
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

      <div className="text-center">
        <button
          className="shop1 btn p-2"
          onClick={() => navigate("/")}
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Bill;
