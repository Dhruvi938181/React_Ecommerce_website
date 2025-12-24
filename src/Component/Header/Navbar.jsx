import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";

const Navbar = ({ onSearch, onCartClick }) => {
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartcount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(savedWishlist.length);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartcount(savedCart.length);

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);

      const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(updatedWishlist.length);

      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartcount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/signin";
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  const scrollToProducts = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("products");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const section = document.getElementById("products");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCategory = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("category");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const section = document.getElementById("category");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPlay = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("play");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const section = document.getElementById("play");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg w-100 p-3 fixed-top bg-white shadow-sm">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img height={40} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/logo.png?crop=center&height=116&v=1732524049&width=398" alt="logo" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav gap-5 mx-auto" style={{ fontSize: "22px", fontWeight: "400" }}>
              <li className="nav-item">
                <Link className="nav-link active" to="/" style={{ textDecoration: "underline" }}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <button className="nav-link active btn bg-transparent border-0" onClick={onCartClick}>
                  Cart
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link active btn bg-transparent border-0" onClick={scrollToProducts}>
                  Product
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link active btn bg-transparent border-0" onClick={scrollToCategory}>
                  Category
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link active btn bg-transparent border-0" onClick={scrollToPlay}>
                  Featured
                </button>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="fs-4"
                    style={{
                      cursor: "pointer",
                      fontWeight: "400",
                    }}
                    onClick={logout}
                    title="Click to logout">
                    {user.name}
                  </span>
                </div>
              ) : (
                <Link to="/signin" className="text-dark fs-4 me-1">
                  <UserIcon />
                </Link>
              )}

              <div className="d-flex align-items-center position-relative">
                <span className="text-dark fs-4 me-1" style={{ cursor: "pointer" }} onClick={() => setShowSearch(!showSearch)}>
                  <SearchIcon />
                </span>
                {showSearch && <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search..." className="form-control" style={{ width: "180px", marginLeft: "5px" }} />}
              </div>

              <Link to="/wishlist" className="text-dark fs-4 me-1 position-relative">
                <HeartIcon />
                {wishlistCount >= 0 && (
                  <span
                    className="position-absolute badge rounded-pill"
                    style={{
                      fontSize: "10px",
                      backgroundColor: "#92614c",
                      top: "-1px",
                      right: "-8px",
                      padding: "4px 6px",
                    }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <span className="text-dark fs-4 position-relative" style={{ cursor: "pointer" }} onClick={onCartClick}>
                <BagIcon />
                {cartCount >= 0 && (
                  <span
                    className="position-absolute badge rounded-pill"
                    style={{
                      fontSize: "10px",
                      backgroundColor: "#92614c",
                      top: "0px",
                      right: "-5px",
                      padding: "4px 6px",
                    }}>
                    {cartCount}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {showCart && (
        <>
          <div
            className="cart-sidebar position-fixed top-0 end-0 bg-white shadow-lg p-3"
            style={{
              width: "380px",
              height: "100vh",
              zIndex: "1050",
              transition: "all 0.3s ease-in-out",
            }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Cart</h5>
              <button className="btn-close" onClick={() => setShowCart(false)}></button>
            </div>

            <div className="cart-items overflow-auto" style={{ maxHeight: "80vh" }}>
              {cartCount === 0 ? <p className="text-center text-muted">Your cart is empty</p> : <p>🛍️ Your cart items will appear here.</p>}
            </div>
          </div>

          <div
            className="cart-backdrop position-fixed top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: "1040",
            }}
            onClick={() => setShowCart(false)}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
