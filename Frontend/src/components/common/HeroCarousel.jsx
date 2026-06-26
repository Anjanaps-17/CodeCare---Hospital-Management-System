import Carousel from "react-bootstrap/Carousel";

import Clinic1 from "../../assets/Clinic1.png";
import Clinic2 from "../../assets/Clinic2.png";
import Clinic3 from "../../assets/Clinic3.png";
import Clinic_code from "../../assets/Clinic_code.jpeg";

function HeroCarousel() {
  return (
    <Carousel
  fade
  interval={2500}
  pause={false}
>

      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={Clinic1}
          alt="Clinic"
        />
        <Carousel.Caption>
          <h2>Welcome to CodeCare HMS</h2>
          <p>Your Health, Our Priority</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={Clinic2}
          alt="Doctors"
        />
        <Carousel.Caption>
          <h2>Expert Medical Team</h2>
          <p>Dedicated Healthcare Professionals</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={Clinic3}
          alt="Patient Care"
        />
        <Carousel.Caption>
          <h2>Patient-Centered Care</h2>
          <p>Compassionate Treatment for Everyone</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 4 */}
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={Clinic_code}
          alt="CodeCare"
        />
        <Carousel.Caption>
          <h2>Advanced Healthcare Technology</h2>
          <p>Compassionate Care, Advanced Technology, Healthier Tomorrow</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default HeroCarousel;