const Images = () => {
  return (
    <div className="container-fluid mt-5" >
      <div className="row">
        <div className="col-md-6 mt-3" style={{ position: "relative", overflow: "hidden" }}>
          <img className="w-100 h-100" style={{ objectFit: "cover" }} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/banner-19.jpg?crop=center&height=1004&v=1733197071&width=700" alt="" />
          <div className="content-box">
            <h2 style={{ fontWeight: "bold" }}>NEW ARRIVALS</h2>
            <p style={{ textDecoration: "underline", cursor: "pointer" }}>Shop Now</p>
          </div>
        </div>

        <div className="col-md-6 mt-3">
          <div className="d-flex">
            <img className="img-fluid" style={{ width: "70%" }} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/banner-20.jpg?crop=center&height=550&v=1733197080&width=517" alt="" />

            <div
              className="text-white d-flex justify-content-center align-items-center flex-grow-1"
              style={{
                backgroundColor: "#000",
                textDecoration: "underline",
              }}>
              <h3
                className="m-0"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  letterSpacing: "2px",
                }}>
                SLINGBACK FLATS
              </h3>
            </div>
          </div>

          <div className="img-3 mt-3" style={{ position: "relative", overflow: "hidden" }}>
            <img className="w-100 h-100" style={{ objectFit: "cover" }} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/banner-21.jpg?crop=center&height=414&v=1733197089&width=700" alt="" />
            <div className="content-box">
              <h2 style={{ fontWeight: "bold" }}>HANDBAG</h2>
              <p style={{ textDecoration: "underline", cursor: "pointer" }}>Shop Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
