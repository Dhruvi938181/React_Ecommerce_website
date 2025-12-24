import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AOSInit from "./Component/assests/AOSInit";
import Bill from "./Component/Bill";
import Cart from "./Component/Cart";
import Category from "./Component/Category";
import CategorySlider from "./Component/CategorySlider";
import Checkout from "./Component/Checkout";
import FeatureSection from "./Component/FeatureSection";
import Footer from "./Component/Footer";
import Navbar from "./Component/Header/Navbar";
import Register from "./Component/Header/Register";
import SignIn from "./Component/Header/SignIn";
import Home from "./Component/Home";
import Images from "./Component/Images";
import Main from "./Component/Main";
import ProductInfo from "./Component/ProductInfo";
import ProtectedRoute from "./Component/ProtectedRoute"; // ✅ import
import Shipping from "./Component/Shipping";
import Subscribe from "./Component/Subscribe";
import Wishlist from "./Component/Wishlist";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = (item) => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((p) => p.id === item.id);
    if (!existing) {
      updatedCart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  return (
    <div>
      <AOSInit />
      <Navbar onSearch={setSearchQuery} onCartClick={() => setShowCart(true)} />
      {/* ✅ Cart sidebar should also be protected */}
      {localStorage.getItem("isLoggedIn") === "true" && <Cart show={showCart} onClose={() => setShowCart(false)} cart={cart} setCart={setCart} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Shipping />
              <Images />
              <CategorySlider />
              <Home searchQuery={searchQuery} onCartOpen={() => setShowCart(true)} />
              <FeatureSection />
              <Subscribe />
              
            </>
          }
        />

        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:id" element={<ProductInfo />} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRoute>
              <Bill />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
