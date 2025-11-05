import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";

const Navbar = ({ onSearch }) => {
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartcount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg w-100 p-3 fixed-top bg-white shadow-sm">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img height={40} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/logo.png?crop=center&height=116&v=1732524049&width=398" alt="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav gap-5 mx-auto" style={{ fontSize: "22px", fontWeight: "400" }}>
              <li className="nav-item">
                <Link className="nav-link active" to="/" style={{ textDecoration: "underline" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Featured
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="fs-4"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      textDecorationColor: "black",
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

              <Link to="/cart" className="text-dark fs-4">
                <BagIcon />
                {cartCount >= 0 && (
                  <span
                    className="position-absolute badge rounded-pill"
                    style={{
                      fontSize: "10px",
                      backgroundColor: "#92614c",
                      top: "23px",
                      right: "21px",
                      padding: "4px 6px",
                    }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
