import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import wishlistImg from "../Component/assests/image.png"; // ✅ Import image
import { myAction } from "./Cart/CartAction";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const cart = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist.map(String));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/data");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((itemId) => itemId !== String(id));
    setWishlist(updatedWishlist);
  };

  const addToCart = (product) => {
    if (!product.available) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock!",
        text: `${product.name} is currently unavailable.`,
        confirmButtonColor: "#d33",
      });
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${product.name} is already in your cart.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    dispatch(myAction({ ...product, quantity: 1 }));
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const wishlistProducts = products.filter((el) =>
    wishlist.includes(String(el.id))
  );

  return (
    <div className="container-fluid" style={{ marginTop: "120px", marginBottom: "50px" }}>
      {/* 🖼️ Wishlist Banner Image */}
      <div className="text-center mb-4">
        <img src={wishlistImg} alt="Wishlist Banner" className="wishlist" />
      </div>

      {/* ✅ Empty Wishlist */}
      {wishlistProducts.length === 0 ? (
        <div className="container text-center" style={{ minHeight: "35vh" }}>
          <h2>Your Wishlist is Empty 💔</h2>
          <p>Add some products to your wishlist to see them here.</p>
          <Link to="/">
            <button className="btn btn-dark rounded-1 mb-3 fs-5 px-4 py-2">
              Go Shopping
            </button>
          </Link>
        </div>
      ) : (
        /* ✅ Wishlist Product Cards */
        <div className="row g-4 mt-3">
          {wishlistProducts.map((el, i) => (
            <div className="col-md-3 col-sm-6" key={i}>
              <div className="card border-0 shadow-sm position-relative">
                {/* ❌ Remove Button */}
                <button
                  onClick={() => removeFromWishlist(el.id)}
                  className="btn btn-light position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiX size={18} color="#000" />
                </button>

                {/* 🖼️ Product Image */}
                <img
                  src={el.image}
                  className="card-img-top"
                  alt={el.name}
                  style={{ height: "300px", objectFit: "cover" }}
                />

                {/* 🛍️ Product Details */}
                <div className="card-body text-center">
                  <h5 className="fw-semibold mb-2">{el.name}</h5>
                  <p className="text-muted mb-2 fs-6">
                    Price: ₹{Number(el.price).toFixed(2)}
                  </p>

                  {el.available ? (
                    <p className="text-success fw-semibold mb-3">In Stock</p>
                  ) : (
                    <p className="text-danger fw-semibold mb-3">
                      Out of Stock
                    </p>
                  )}

                  <button
                    className="btn btn-dark w-100 fw-semibold rounded-3"
                    disabled={!el.available}
                    style={{
                      opacity: el.available ? 1 : 0.6,
                      cursor: el.available ? "pointer" : "not-allowed",
                    }}
                    onClick={() => addToCart(el)}
                  >
                    {el.available ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
