import { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import HeroCarousel from "../components/common/HeroCarousel";
import Footer from "../components/common/Footer";

function Home() {

  useEffect(() => {
    console.log("Home page loaded");
  }, []);

  return (
    <>
      <Navbar />
      <HeroCarousel />

      <div className="page-wrapper">

        <div className="container my-5 text-center">
          <h2 className="fst-italic text-secondary">
            "Compassionate Care, Advanced Technology, Healthier Tomorrow."
          </h2>
        </div>

        <div className="page-container my-5">
          <h2 className="text-center mb-4">About CodeCare Clinic</h2>

          <p className="lead text-center">
           CodeCare Clinic is a modern healthcare center dedicated to delivering high-quality, patient-focused medical services through the perfect blend of compassionate care and advanced technology.
           Our mission is to provide accessible, efficient, and reliable healthcare while ensuring every patient receives personalized attention and professional treatment. With a team of experienced doctors, skilled healthcare professionals, and a technology-driven management system, CodeCare Clinic strives to create a seamless healthcare experience for patients and staff alike.
           From routine consultations and preventive care to specialized treatments and health management services, we are committed to improving the well-being of our community. At CodeCare Clinic, we believe that healthcare is not just about treating illnesses—it's about building healthier lives and a healthier future.
           Compassionate Care, Advanced Technology, Healthier Tomorrow.
          </p>
        </div>

        <div className="page-container my-5">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="card shadow text-center p-3">
                <h4>📞 Contact</h4>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow text-center p-3">
                <h4>📧 Email</h4>
                <p>info@codecare.com</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow text-center p-3">
                <h4>📍 Address</h4>
                <p>Kochi, Kerala</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Home;