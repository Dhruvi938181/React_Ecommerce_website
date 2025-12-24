import { motion } from 'framer-motion';
import "../App.css";
const Subscribe = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}> <div>
      <div className="img d-flex flex-column justify-content-center align-items-end mt-5">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: 1,
          }}></div>

        <div className="text-start me-5" style={{ color: "#fff", position: "relative", zIndex: 2 }}>
          <h4>SUBSCRIBE</h4>
          <p className="join">
            <b>Join our newsletter</b>
          </p>
          <input type="email" className="form-control rounded-0" placeholder="Email Address..." style={{ height: "50px" }} />
          <br />
          <button className="shop mt-2">SUBSCRIBE</button>
        </div>
      </div>
    </div></motion.div>
  );
};

export default Subscribe;
