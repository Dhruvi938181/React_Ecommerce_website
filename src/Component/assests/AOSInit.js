// src/components/AOSInit.js
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // default duration
      once: true,     // animation occurs only once
      easing: "ease-in-out",
    });
  }, []);

  return null; // ye render nahi karega, sirf init ke liye hai
};

export default AOSInit;
