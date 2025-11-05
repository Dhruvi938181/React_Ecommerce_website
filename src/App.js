import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AOSInit from "./Component/assests/AOSInit";
import Bill from './Component/Bill';
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
import Shipping from "./Component/Shipping";
import Subscribe from "./Component/Subscribe";
import Wishlist from "./Component/Wishlist";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <AOSInit />
      {/* 🔹 Connect Navbar with search */}
      <Navbar onSearch={setSearchQuery} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Shipping />
              <Images />
              <CategorySlider />
              {/* 🔹 Pass searchQuery to Home */}
              <Home searchQuery={searchQuery} />
              <FeatureSection />
              <Subscribe />
            </>
          }
        />
        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
