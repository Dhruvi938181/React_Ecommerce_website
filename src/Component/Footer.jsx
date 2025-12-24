import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import "../App.css";
import { Facebook, LinkedIn, Twitter } from "./Header/Icons";

const Footer = () => {

  const [showButton, setShowButton] = useState(false);

  // Show arrow after scrolling 200px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <footer className="bg-dark text-white pt-5 pb-4">
          <div className="container">
            <div className="row">

              {/* Column 1 */}
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <h2 className="mb-3" style={{ fontFamily: "serif" }}>LUMEl</h2>
                <p>Email: lumei@gmail.com</p>
                <p>Hours: Mon - Fri // 7am - 4pm (UTC-7)</p>
                <p>
                  Address: 1200 Getty Center Drive,<br />
                  Los Angeles, CA 90049, USA
                </p>
              </div>

              {/* Column 2 */}
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <h4 className="mb-3">Contact Us</h4>
                <ul className="list-unstyled footer-links">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Delivery Information</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <h4 className="mb-3">Information</h4>
                <ul className="list-unstyled footer-links">
                  <li>My Account</li>
                  <li>Login</li>
                  <li>My Cart</li>
                  <li>Wishlist</li>
                  <li>Checkout</li>
                </ul>
              </div>

              {/* Column 4 */}
             {/* Column 4 */}
<div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
  <h4 className="mb-3">Follow Us</h4>
  <ul className="list-unstyled footer-social">

    <li className="d-flex align-items-center mb-2">
      <a href="https://facebook.com" target="_blank" className="text-white text-decoration-none d-flex align-items-center">
        <Facebook className="fs-5 me-2" /> Facebook
      </a>
    </li>

    <li className="d-flex align-items-center mb-2">
      <a href="https://twitter.com" target="_blank" className="text-white text-decoration-none d-flex align-items-center">
        <Twitter className="fs-5 me-2" /> Twitter
      </a>
    </li>

    <li className="d-flex align-items-center mb-2">
      <a href="https://wa.me/9574938181" target="_blank" className="text-white text-decoration-none d-flex align-items-center">
        <FaWhatsapp className="fs-5 me-2" /> WhatsApp
      </a>
    </li>

    <li className="d-flex align-items-center mb-2">
      <a href="https://tiktok.com" target="_blank" className="text-white text-decoration-none d-flex align-items-center">
        <FaTiktok className="fs-5 me-2" /> TikTok
      </a>
    </li>

    <li className="d-flex align-items-center mb-2">
      <a href="https://linkedin.com" target="_blank" className="text-white text-decoration-none d-flex align-items-center">
        <LinkedIn className="fs-5 me-2" /> LinkedIn
      </a>
    </li>

  </ul>
</div>


            </div>

            <div className="text-center mt-4">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} LUMEl. All rights reserved.
              </p>
            </div>

          </div>
        </footer>
      </motion.div>

      {/* Floating Back-to-Top Button */}
      {showButton && (
        <span className='topbtn'
          onClick={scrollToTop}
          
        >
          <i class="fas fa-arrow-up"></i>
        </span>
      )}
    </>
  );
};

export default Footer;
