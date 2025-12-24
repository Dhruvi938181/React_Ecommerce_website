import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../App.css";
import { myAction } from "./Cart/CartAction";

const ProductInfo = ({ onCartClick }) => {
  const [product, setProduct] = useState({});
  const [showDesc, setShowDesc] = useState(false);
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApi();
  }, [category, id]);

  const fetchApi = async () => {
    try {
      const info = await axios.get(`http://localhost:3000/${category}/${id}`);
      setProduct(info.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const AddTocart = () => {
    if (!product.available) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This product is currently unavailable!",
        confirmButtonColor: "#92614c",
      });
      return;
    }

    // ✅ Check by name (ignore case)
    const exists = cart.find(
      (item) => item.name.toLowerCase() === product.name.toLowerCase()
    );

    if (exists) {
      Swal.fire({
        icon: "warning",
        title: "Already in Cart",
        text: "This product is already added to your cart!",
        confirmButtonColor: "#92614c",
      });
      if (onCartClick) onCartClick();
      return;
    }

    const newItem = { ...product, id, category, quantity: 1 };
    dispatch(myAction(newItem));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: "Your product has been successfully added.",
      showConfirmButton: false,
      timer: 1000,
    });

    if (onCartClick) onCartClick();
  };

  const handleMouseMove = (e) => {
    const image = e.currentTarget.querySelector(".zoom-image");
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
    image.style.transform = "scale(1.8)";
  };

  const handleMouseLeave = (e) => {
    const image = e.currentTarget.querySelector(".zoom-image");
    image.style.transformOrigin = "center center";
    image.style.transform = "scale(1)";
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row align-items-start g-5">
        <div className="col-lg-5 col-md-12">
          <div
            className="image-container  position-relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: "zoom-in", backgroundColor: "#f9f9f9" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="zoom-image w-100"
              style={{
                transition:
                  "transform 0.4s ease, transform-origin 0.4s ease, filter 0.3s",
              }}
            />
            {!product.available && (
              <span
                className="position-absolute top-0 start-0 text-white px-3 py-1"
                style={{
                  borderBottomRightRadius: "10px",
                  fontSize: "0.85rem",
                  backgroundColor: "#d9534f",
                }}
              >
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-7 col-md-12">
          <div
            className="p-4 rounded shadow-sm border"
            style={{ backgroundColor: "#fff" }}
          >
            <h1 className="mb-3" style={{ fontWeight: 600 }}>
              {product.name}
            </h1>

            <p className="fs-5 mb-2">
              <strong>Price:</strong>{" "}
              <span style={{ textDecoration: "line-through", color: "#888" }}>
                ₹{product.OriginalPrice}
              </span>{" "}
              <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                ₹{product.price}
              </span>
            </p>

            <p className="mb-2">
              <strong>GST:</strong> {product.gst}%
            </p>

            <p className="mb-3">
              <strong>Rating:</strong>{" "}
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      i < Math.round(product.rating || 0)
                        ? "#FFD700"
                        : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}{" "}
              ({product.rating || 0}) from {product.totalRatings || 0} ratings &
              {product.totalReviews || 0} reviews
            </p>

            <div className="mb-4">
              {product.available !== undefined && (
                <span
                  className={`availability-badge ${
                    product.available ? "available" : "unavailable"
                  }`}
                >
                  {product.available ? "✔ In Stock" : "✖ Out of Stock"}
                </span>
              )}
            </div>

            <div className="mb-4">
              <strong>Available Offers:</strong>
              <ul className="list-unstyled mt-2">
                {product.offers && product.offers.length > 0 ? (
                  product.offers.map((offer, idx) => (
                    <li key={idx} className="mb-1">
                      <span className="badge bg-warning text-dark me-2">
                        Offer
                      </span>
                      {offer}
                    </li>
                  ))
                ) : (
                  <li className="text-muted">No offers available</li>
                )}
              </ul>
            </div>

            <div
              className="accordion mb-4"
              style={{ border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <div
                className="accordion-header p-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDesc(!showDesc)}
              >
                <strong>Product Description</strong>
                <span style={{ float: "right" }}>{showDesc ? "-" : "+"}</span>
              </div>
              {showDesc && (
                <div className="accordion-body p-3 border-top">
                  <p className="text-muted mb-0">
                    {product.discription || "No description available."}
                  </p>
                </div>
              )}
            </div>

            <div className="d-flex gap-3" style={{ height: "60px" }}>
              <button
                onClick={AddTocart}
                disabled={product.available === false}
                className="btn w-100"
                style={{
                  padding: "12px 0",
                  fontSize: "1.2rem",
                  borderRadius: "12px",
                  fontWeight: 500,
                  backgroundColor: "#fff",
                  border: "2px solid #92614c",
                  color: "#92614c",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#92614c";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.color = "#92614c";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />
    </div>
  );
};

export default ProductInfo;
