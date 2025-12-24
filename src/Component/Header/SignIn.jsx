import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      registeredUser &&
      registeredUser.email === form.email &&
      registeredUser.password === form.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(registeredUser));

      alert("Sign In Successful!");
      navigate("/"); 
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div>
      <h1 className="text-center" style={{ marginTop: "120px", fontSize: "50px" }}>
        Account
      </h1>
      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="w-75 mx-auto mt-5">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <p
                className="mt-3"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Lost your password?
              </p>
              <button type="submit" className="btn shop1 w-100 rounded-0">
                Sign In
              </button>
            </form>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="w-75 fs-5 mt-5">
              <h4>New customer?</h4>
              <p>
                Sign up for early Sale access plus tailored new arrivals, trends
                and promotions. To opt out, click unsubscribe in our emails.
              </p>
              <Link className="btn shop1 fs-5 rounded-0" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
