
import { useState } from "react";
import { Modal } from "react-bootstrap";

const FeatureSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => setShowVideo(true);
  const handleClose = () => setShowVideo(false);

  return (
    <div className="container-fluid  mt-5">
      <div className="row align-items-center">
        <div className="col-lg-5 mb-4 ms-xl-5 mb-md-0">
          <h6 className="text-uppercase">Bold and Beautiful</h6>
          <h2 className="mb-3">Mixing High and Low</h2>
          <img
            src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/banner-22.jpg?v=1733210397&width=1200"
            alt="Left Feature"
            className="img-fluid feature-left"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-lg-6 position-relative ms-xl-5 mt-5">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "500px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/lookbook-4.jpg?crop=center&height=765&v=1733212548&width=715"
              alt="Right Feature"
              className="img-fluid"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              onClick={handleOpen}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#92614c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "black")}
            >
              PLAY
            </div>
          </div>

          <p className="mt-3">
            Discover the latest trends and timeless pieces at Lumei, where we curate collections that let you express yourself effortlessly. Whether you’re dressing up for a special occasion or adding
            essentials to your daily wardrobe, find your signature look here.
          </p>
        </div>
      </div>

      <Modal show={showVideo} onHide={handleClose} centered size="lg">
        <div className="ratio ratio-16x9">
           <iframe width="1000" height="600" src="https://www.youtube.com/embed/yycVNcishrE" title="Britney Manson - FΛSHION (Single, 2023)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default FeatureSection;

