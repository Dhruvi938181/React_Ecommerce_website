import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Home = ({ searchQuery }) => {
  const [product, setProduct] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchApi();

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist.map(String));

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const fetchApi = async () => {
    try {
      const info = await axios.get("http://localhost:3000/data");
      setProduct(info.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      const productSection = document.getElementById("products");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchQuery]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisible((prev) => prev + 8);
      setLoadingMore(false);
    }, 1000);
  };

  const toggleWishlist = (id) => {
    let updatedWishlist;
    if (wishlist.includes(String(id))) {
      updatedWishlist = wishlist.filter((itemId) => itemId !== String(id));
    } else {
      updatedWishlist = [...wishlist, String(id)];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    Swal.fire({
      icon: "success",
      title: wishlist.includes(String(id)) ? "Removed from Wishlist!" : "Added to Wishlist!",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const addToCart = (item) => {
    if (!item.available) {
      Swal.fire({
        title: "Out of Stock!",
        text: `${item.name} is currently unavailable.`,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    let updatedCart = [...cart];
    const existingItem = updatedCart.find((p) => p.id === item.id);

    if (existingItem) {
      Swal.fire({
        title: "Already in Cart!",
        text: `${item.name} is already in your cart.`,
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      updatedCart.push({ ...item, quantity: 1 });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      Swal.fire({
        title: "Added to Cart!",
        text: `${item.name} has been added successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const filteredProducts = product.filter((el) => el.name.toLowerCase().includes(searchQuery?.toLowerCase() || ""));

  return (
    <div className="container mt-3" id="products">
      <h2 className="mt-5" style={{ fontFamily: "inherit" }}>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Best Seller
        </motion.div>
      </h2>

      <div className="row mt-3 g-4">
        
        {filteredProducts.slice(0, visible).map((el) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={el.id}>
            <div className="card h-100 shadow-sm border-0 position-relative product-card">
              <div className="position-relative product-img-container" style={{ overflow: "hidden" }}>
                <Link to={`/${el.category}`}>
                  <img src={el.image} alt={el.name} className="card-img-top product-img" style={{ height: "350px", objectFit: "cover", width: "100%" }} />
                </Link>

                {(!el.available || el.available === 0) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      backgroundColor: "#d9534f",
                      color: "white",
                      padding: "5px 10px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      borderRadius: "5px",
                      zIndex: 10,
                    }}>
                    Out of Stock
                  </div>
                )}

                <span
                  onClick={() => toggleWishlist(el.id)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.8rem",
                    color: wishlist.includes(String(el.id)) ? "red" : "gray",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}>
                  {wishlist.includes(String(el.id)) ? <AiFillHeart /> : <AiOutlineHeart />}
                </span>

                <button className="btn add-to-cart-btn" onClick={() => addToCart(el)}>
                  Add to Cart
                </button>
              </div>

              <div className="card-body text-center">
                <h5 className="card-title">{el.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible < filteredProducts.length && (
        <div className="text-center mt-4">
          {loadingMore ? (
            <div>
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading more products...</p>
            </div>
          ) : (
            <button className="shop btn rounded-0 fs-5 px-4" onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
