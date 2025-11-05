import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    alert("Registration Successful! Please Sign In");
    navigate("/signin");
  };

  return (
    <div>
      <form className="w-50 mx-auto " style={{marginTop:"120px"}} onSubmit={handleSubmit}>
        <h1
          className="text-center"
          style={{ fontSize: "50px", marginTop: "70px", marginBottom: "70px" }}
        >
          Create Account
        </h1>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control rounded-0"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control rounded-0"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control rounded-0"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control rounded-0"
            placeholder="Enter Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <p>
          Sign up for early Sale access plus tailored new arrivals, trends and
          promotions. To opt out, click unsubscribe in our emails.
        </p>
        <button type="submit" className="shop1 btn w-100 rounded-0 me-2">
          Register
        </button>
        <Link className="shop1 btn pt-2 mt-3 mb-3 w-100 rounded-0" to="/signin">
          Sign In
        </Link>
      </form>
    </div>
  );
};

export default Register;
