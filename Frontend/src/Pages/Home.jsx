// src/Pages/Home.jsx

import Navbar from "../components/common/Navbar";
import HeroCarousel from "../components/common/HeroCarousel";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <>
       <Navbar />

  <HeroCarousel />
      <div className="container my-5 text-center">
        <h2 className="fst-italic text-secondary">
          "Compassionate Care, Advanced Technology,
          Healthier Tomorrow."
        </h2>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">
          About CodeCare Clinic
        </h2>

        <p className="lead text-center">
          CodeCare Health Management System is a
          modern healthcare solution dedicated to
          providing high quality patient care through
          technology, experienced professionals and
          efficient management.
        </p>
      </div>

      <div className="container my-5">
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

      <Footer />
    </>
  );
}

export default Home;