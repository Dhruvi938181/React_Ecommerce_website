const Shipping = () => {
  return (
    <div>
      <div className="container-fluid text-center text-sm-start mt-5" >
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-4 d-sm-flex justify-content-xl-center">
            <div className="d-sm-flex">

            <div>
              <img height={70} width={70} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/free.svg?v=1733195868" alt="" />
            </div>
            <div className="ms-3 mt-2">
              <h6>FREE SHIPPPING</h6>
              <p>Free Shipping for orders over £130</p>
            </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-4 ms-0 d-sm-flex justify-content-xl-center">
          <div className="d-sm-flex">
              <div>
                <img height={70} width={70} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/gift.svg?v=1733196238" alt="" />
            </div>
            <div className="ms-3 mt-2">
                <h6>MONEY GUARANTEE</h6>
                <p>Within 30 days for an exchange</p>
            </div>
          </div>
          </div>
          <div className="col-md-6 col-lg-4 d-sm-flex justify-content-xl-center">
           <div className="d-sm-flex">
             <div>
                <img height={70} width={70} src="https://wpbingo-lumei.myshopify.com/cdn/shop/files/payment.svg?v=1733196273" alt="" />
            </div>
            <div className="ms-3 mt-2">
                <h6>SECURE PAYMENT</h6>
                <p>Customer information security</p>
            </div>
           </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Shipping;
