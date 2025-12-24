import axios from "axios";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Category = () => {
  const [product, setProduct] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetchApi();
  }, [category]); 

  const fetchApi = async () => {
    try {
      const info = await axios.get(`http://localhost:3000/${category}`);
      setProduct(info.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}> <div className="container mb-5" style={{ marginTop: "120px" }}>
      {product.map((el, i) => (
        <div
          className="row align-items-center shadow-sm mb-4 mt-5 p-3 single-product-row"
          key={i}
          style={{
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <div className="col-12 col-md-5 text-center">
            <Link to={`/${el.category}/${el.id}`}>
              <img
                src={el.image}
                alt={el.name}
                className="img-fluid rounded"
                style={{
                  height: "300px",
                  width: "75%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>

          <div className="col-12 col-md-7 mt-3 mt-md-0">
            <h4 style={{ fontWeight: "600" }}>{el.name}</h4>
            <p className="text-muted fs-5 mb-2"><b>Price</b>: ₹{el.price}</p>
            <p style={{ color: "#555", textAlign: "justify" }}>
              <b>Discription:</b>{el.discription}
            </p>
          </div>
        </div>
      ))}
    </div></motion.div>
  );
};

export default Category;
