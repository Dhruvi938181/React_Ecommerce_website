import { motion } from 'framer-motion';
import "../App.css";
const Main = () => {

  const handleShopNow = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}> 
    <div>
      <div id="carouselExampleCaptions" className="carousel slide" style={{marginTop:"80px"}} data-bs-ride="carousel" >
        <div className="carousel-indicators text-center">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active slide1 " data-bs-interval="2000">
            <div className="d-flex  flex-column justify-content-center align-items-end" style={{ height: "700px" }}>
              <div className="text-start">
                <h1>MUST HAVE PIECES FOR THE SEASON</h1>
                <p className="mt-3">Prestigious and outstanding fashion...</p>
                <button className="shop" onClick={handleShopNow}>SHOP NOW</button>
              </div>
            </div>
          </div>

          <div className="carousel-item slide2 " data-bs-interval="2000">
            <div className="d-flex flex-column justify-content-center align-items-end" style={{ height: "700px" }}>
              <div className="text-start">
                <h1>YOUR WARDROBE FROM SUMMER</h1>
                <p className="mt-3">Vintage Clothing in a Modern Way...</p>
                <button className="shop" onClick={handleShopNow}>SHOP NOW</button>
              </div>
            </div>
          </div>

          <div className="carousel-item slide3" data-bs-interval="2000">
            <div className="d-flex flex-column justify-content-center align-items-end" style={{ height: "700px" }}>
              <div className="text-start">
                <h1>FASHION FOR THE PETITE FRAME</h1>
                <p className="mt-3">Impact of Technology on Fashion...</p>
                <button className="shop" onClick={handleShopNow}>SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Main;
