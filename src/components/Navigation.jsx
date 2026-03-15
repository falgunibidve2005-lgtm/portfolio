import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navigation.css";

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, null, `#${targetId}`);
    }
  };

  return (
    <motion.nav
      className={`nav ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, "hero")}
        >
          Falguni<span>.</span>Dev
        </a>

        <button
          className={`nav-mobile-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>
          <a
            href="#projects"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "projects")}
          >
            Projects
          </a>
          <a
            href="#skills"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "skills")}
          >
            Skills
          </a>
          <a
            href="#learning"
            className="nav-link"
            onClick={(e) => handleNavClick(e, "learning")}
          >
            Learning
          </a>
          <a
            href="/FalguniBidave_CV.pdf"
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </a>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact Me
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navigation;
