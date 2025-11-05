import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import "../App.css";
import { Facebook, LinkedIn, Twitter } from "./Header/Icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Column 1 */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <h2 className="mb-3" style={{ fontFamily: "serif" }}>
              LUMEl
            </h2>
            <p>Email: lumei@gmail.com</p>
            <p>Hours: Mon - Fri // 7am - 4pm (UTC-7)</p>
            <p>
              Address: 1200 Getty Center Drive,
              <br />
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
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <h4 className="mb-3">Follow Us</h4>
            <ul className="list-unstyled footer-social">
              <li className="d-flex align-items-center mb-2">
                <Facebook className="fs-5 me-2" /> Facebook
              </li>
              <li className="d-flex align-items-center mb-2">
                <Twitter className="fs-5 me-2" /> Twitter
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaWhatsapp className="fs-5 me-2" /> WhatsApp
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaTiktok className="fs-5 me-2" /> Tiktok
              </li>
              <li className="d-flex align-items-center mb-2">
                <LinkedIn className="fs-5 me-2" />
                LinkedIn
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} LUMEl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
