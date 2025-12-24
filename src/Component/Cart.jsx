import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = ({ show, onClose }) => {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

 useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  setCart(savedCart);

  setDiscount(0);
  localStorage.removeItem("couponApplied");
}, [show]);


  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    Swal.fire({
      icon: "info",
      title: "Item removed from cart 🛒",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      const discountAmount = totalPrice * 0.1;
      setDiscount(discountAmount);
      localStorage.setItem("couponApplied", "SAVE10");

      Swal.fire({
        icon: "success",
        title: "Coupon applied! 10% discount added 🎉",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setDiscount(0);
      localStorage.removeItem("couponApplied");
      Swal.fire({
        icon: "error",
        title: "Invalid coupon code ❌",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const finalTotal = totalPrice - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Your cart is empty!",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }

    const checkoutData = {
      items: cart,
      subtotal: totalPrice,
      discount,
      total: finalTotal,
    };
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    Swal.fire({
      icon: "success",
      title: "Proceeding to Checkout!",
      showConfirmButton: false,
      timer: 1000,
    });

    onClose();
    navigate("/checkout");
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart 🛒</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="60"
                    height="60"
                    className="me-3 rounded"
                  />
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">₹{item.price}</small>
                    <div className="d-flex align-items-center mt-1">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => decrementQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter Coupon Code (SAVE10)"
                className="form-control mb-2"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="btn btn-dark w-100" onClick={applyCoupon}>
                Apply Coupon
              </button>
            </div>

            <div className="mt-3 text-end">
              <h6>Subtotal: ₹{totalPrice.toFixed(2)}</h6>
              {discount > 0 && (
                <p className="text-success">Discount: -₹{discount.toFixed(2)}</p>
              )}
              <h5>Total: ₹{finalTotal.toFixed(2)}</h5>
              <button className="shop1 btn  w-100 mt-2" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-3">
              <Link
                to="/"
                className="shop1  btn  w-100"
                onClick={onClose}
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
