import { Link } from "react-router-dom";
const CategorySlider = () => {
  return (
    <div>
      <h2 className="mt-5 text-center">Shop by Categories</h2>
      <div className="container-fluid mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
            <Link to="/hat">
              {" "}
              <img
                className="img-fluid"
                style={{ borderRadius: "50%" }}
                src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/categories-5.jpg?crop=center&height=432&v=1732085530&width=432"
                alt=""
              />
            </Link>
            <h5 className="text-center mt-3">HATS</h5>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
            <Link to="/bag">
              <img
                className="img-fluid"
                style={{ borderRadius: "50%" }}
                src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/categories-2.jpg?crop=center&height=432&v=1732085529&width=432"
                alt=""
              />
            </Link>
            <h5 className="text-center mt-3">BAGS</h5>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
            <Link to="/cloth">
              <img
                className="img-fluid"
                style={{ borderRadius: "50%" }}
                src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/categories-1.jpg?crop=center&height=432&v=1732085498&width=432"
                alt=""
              />
            </Link>
            <h5 className="text-center mt-3">CLOTHES</h5>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
            <Link to="/sunglass">
              <img
                className="img-fluid"
                style={{ borderRadius: "50%" }}
                src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/categories-4.jpg?crop=center&height=432&v=1732085529&width=432"
                alt=""
              />
            </Link>
            <h5 className="text-center mt-3">GLASSES</h5>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
            <Link to="/shoes">
              <img
                className="img-fluid"
                style={{ borderRadius: "50%" }}
                src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/categories-6.jpg?crop=center&height=432&v=1732085530&width=432"
                alt=""
              />
            </Link>
            <h5 className="text-center mt-3">SHOES</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
