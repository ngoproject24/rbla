import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AboutPage.css";

// Import images properly
import varlogo from "../Components/Assets/varlogo.png";
import about2 from "../Components/Assets/about2.png";
import about1 from "../Components/Assets/about1.png";
import about3 from "../Components/Assets/about3.png";
import vaalogo from "../Components/Assets/vaalogo.png";
import sirlogo from "../Components/Assets/sirlogo.png";

const AboutPage = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // Toggle function for 'Read More'
  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  // Slider settings to show a single image at a time
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show 1 image at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false, // Set to true if you want navigation arrows
  };

  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
        <h1>SURVIVOR PRODUCTS</h1>
        <p>** **</p>
      </header>

      

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-text">
          <h2>Rehabilitation of Bonded Labourers Act (RBLA)</h2>
          <p>
            The Rehabilitation of Bonded Labourers Act (RBLA), enacted in India
            in 1976, is a landmark law aimed at eradicating bonded labor and
            rehabilitating individuals who have been subjected to this form of
            exploitation. Bonded labor, a system of forced labor where
            individuals are compelled to work to repay debts under harsh
            conditions, remains one of the most pernicious forms of modern-day
            slavery.
          </p>
          <h2>Key Provisions of the Act</h2>
          <p className={showMore ? "expanded" : ""}>
            <h3>Prohibition of Bonded Labour:</h3> The RBLA prohibits bonded
            labor in all forms, making it illegal for any individual to be
            forced into labor as a means of repaying debts. It criminalizes the
            practice and lays the foundation for ensuring that bonded laborers
            are freed from their exploitative conditions.
            {showMore && (
              <span>
                <h3>Release and Rehabilitation of Bonded Labourers:</h3> The
                Act ensures that bonded laborers are freed from servitude, and a
                process of rehabilitation is set in motion. This includes the
                provision of rehabilitation funds and various welfare schemes to
                ensure the economic and social integration of the survivors into
                mainstream society.
              </span>
            )}
          </p>
          <button className="read-more-btn" onClick={toggleReadMore}>
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* Slider Section */}
        <div className="hero-image-slider">
          <Slider {...sliderSettings}>
            <div>
              <img src={about1} alt="Slide 1" /> 
            </div>
            <div>
              <img src={about2} alt="Slide 2" />
            </div>
            <div>
              <img src={about3} alt="Slide 3" />
            </div>
          </Slider>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={varlogo} alt="Varnam Logo" />
            <h3>John Doe</h3>
            <p>Varnam</p>
            <button onClick={() => navigate("/varnam")}>More</button>
          </div>
          <div className="team-member">
            <img src={vaalogo} alt="Vaagai Logo" />
            <h3>Jane Smith</h3>
            <p>Vaagai</p>
            <button onClick={() => navigate("/vaagai")}>More</button>
          </div>
          <div className="team-member">
            <img src={sirlogo} alt="Siragugal Logo" />
            <h3>Emily Johnson</h3>
            <p>Siragugal</p>
            <button onClick={() => navigate("/siragugal")}>More</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
