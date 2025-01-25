import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./varnam.css";
import varlogo from "../Components/Assets/varlogo.png"; // Adjust the path if needed
import v1 from "../Components/Assets/v1.png";
import v2 from "../Components/Assets/v2.png";
import v3 from "../Components/Assets/v3.png";
import v4 from "../Components/Assets/v4.png";
import v5 from "../Components/Assets/v5.png";
import v6 from "../Components/Assets/v6.png";
import v7 from "../Components/Assets/v7.png";
import v8 from "../Components/Assets/v8.png";
import v9 from "../Components/Assets/v9.png";
import v10 from "../Components/Assets/v10.png";
import v11 from "../Components/Assets/v11.png";
import v12 from "../Components/Assets/v12.png";
import v13 from "../Components/Assets/v13.png";
import v14 from "../Components/Assets/v14.png";
import v15 from "../Components/Assets/v15.png";
import v16 from "../Components/Assets/v16.png";


const Varnam = () => {
  const navigate = useNavigate(); // React Router navigation hook
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Toggle function for 'Read More'
  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  const images = [
    v1, v2, v3, v4, v5, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="varnam-page">
      {/* Header */}
      <header className="varnam-header" style={{ backgroundImage: `url(${v6})` }}>
        <div className="header-overlay">
          <img src={varlogo} alt="Varnam Logo" className="varnam-logo" />
          <h1>Varnam Unit</h1>
          <p>MADE BY SURVIVORS OF BONDED LABOUR</p>
        </div>
      </header>

      {/* About Section */}
      <section className="varnam-about">
        <h2>About Varnam</h2>
        <h4><center>**Varnam: Empowering Survivors of Bonded Labour through Sustainable Livelihood**</center></h4>

        <p className={showMore ? "expanded" : ""}>
          'Varnam' is a remarkable community enterprise that stands as a beacon of hope and empowerment for individuals who have endured the harsh realities of bonded labour. Established in 2019 in the town of Thiruthani, located in the Tiruvallur district of Tamil Nadu, Varnam is a collective of survivors who have transformed their lives through resilience, skill development, and entrepreneurship. This initiative, which initially brought together 14 individuals, has evolved into a thriving block printing and tailoring unit, providing not just livelihood, but also dignity and purpose to those involved.
          {showMore && (
            <span>
              The foundation of Varnam lies in its profound mission to create sustainable livelihoods for individuals who have been freed from the chains of bonded labour. These survivors, having faced years of exploitation and oppression, have now become role models for others in similar circumstances. Through rigorous training in block printing and tailoring, they have acquired valuable skills that enable them to generate a stable income. This transformation is not just about economic independence; it is about breaking the cycle of poverty and marginalization, offering these individuals a chance at a better life.

              In many ways, Varnam represents a shift from victimhood to empowerment. The survivors, who were once trapped in a system of forced labour and subjugation, have now taken charge of their own destinies. By running a block printing unit, they are not only earning a livelihood but also preserving a traditional craft that is deeply rooted in Indian culture. Block printing, with its intricate designs and vibrant colors, is a reflection of their creativity and resilience. Tailoring, too, serves as a form of self-expression and an avenue for economic empowerment.

              The significance of Varnam goes beyond its economic impact. It is a symbol of hope for other survivors of bonded labour, proving that they too can overcome their circumstances and achieve freedom and dignity. Varnam’s success demonstrates the power of collective action, as the 14 founding members have worked together to build something truly transformative. Their journey from being survivors to becoming entrepreneurs is a testament to their strength and determination. It also sends a powerful message to the wider society, encouraging people to support such initiatives and contribute to the eradication of bonded labour.
            </span>
          )}
        </p>
        <button className="read-more-btn" onClick={toggleReadMore}>
          {showMore ? "Read Less" : "Read More"}
        </button>
      </section>

      

      {/* Image Gallery (Slider View) */}
      <section className="varnam-album">
        <h2>Gallery</h2>
        <div className="slider-container">
          <div className="slider-content">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="slider-image"
            />
          </div>
          <button className="next-arrow" onClick={handleNext}>
            &rarr;
          </button>
        </div>
      </section>

      {/* Modal for Image View */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={currentImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="varnam-services">
        <h2>Our Services</h2>
        <ul>
          <li>Innovative product development</li>
          <li>State-of-the-art software solutions</li>
          <li>Customized consultancy services</li>
          <li>Technical training and upskilling programs</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="varnam-contact">
        <h2>Contact Us</h2>
        <p>Have questions? Get in touch with us at:</p>
        <p>Email: info@varnamunit.com</p>
        <p>Phone: +1 234 567 8901</p>
        <button onClick={() => navigate("/AboutPage")}>Go to About Us</button>
      </section>

      {/* Footer */}
      <footer className="varnam-footer">
        <p>&copy; 2025 Varnam Unit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Varnam;
