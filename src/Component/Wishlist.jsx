import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((itemId) => itemId !== String(id));
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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

  const wishlistProducts = products.filter((el) => wishlist.includes(String(el.id)));

  if (wishlistProducts.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="container text-center " style={{ marginTop: "120px", minHeight: "35vh" }}>
          <h2>Your Wishlist is Empty 💔</h2>
          <p>Add some products to your wishlist to see them here.</p>
          <Link to="/">
            <button className="btn btn-dark rounded-1 mb-3 fs-5 px-4 py-2">Go Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "120px" ,marginBottom:"50px"}}>
      <h1 className="fw-bold mb-4 text-center">Wishlist ❤️</h1>

      <table className="table border align-middle text-center">
        <thead>
          <tr className="border-bottom">
            <th style={{ width: "50%" }} className="text-start">
              Products
            </th>
            <th style={{ width: "15%" }}>Price</th>
            <th style={{ width: "15%" }}>Stock Status</th>
            <th style={{ width: "20%" }}></th>
          </tr>
        </thead>
        <tbody>
          {wishlistProducts.map((el, i) => (
            <tr key={i}>
              <td data-label="Product" className="text-start">
                <img src={el.image} alt={el.name} style={{ width: "80px", height: "80px" }} />
                <span className="fw-semibold ms-4">{el.name}</span>
              </td>
              <td data-label="Price" className="fw-semibold fs-6">
                ₹{Number(el.price).toFixed(2)}
              </td>
              <td data-label="Stock Status">{el.available ? <span className="text-success fw-semibold">In Stock</span> : <span className="text-danger fw-semibold">Out of Stock</span>}</td>
              <td data-label="">
                <button className="shop1 rounded-3 px-4 fw-semibold w-100" onClick={() => addToCart(el)}>
                  Add to Cart
                </button>
              </td>
              <td data-label="">
                <button
                  onClick={() => removeFromWishlist(el.id)}
                  className="btn btn-light p-0 me-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f3f3f3",
                  }}>
                  <FiX size={18} color="#555" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
