import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import hero from "../assets/hero-img-1.png";
import "../landing_page.css"

export default function LandingPage() {
  const navigate = useNavigate(); // Add this hook
  const [phoneInput, setPhoneInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsAppConnect = () => {
    navigate("/login");
  };

  const handleGetStarted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  return (
    <div className="landing-page">
      {/* ==================== NAVBAR ==================== */}
      <div className={`topbar ${isScrolled ? "scrolled" : ""}`}>
        <nav className="top-nav-bar">
          <div className="top-nav-logo">
            <a href="/" className="nav-brand">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">TradeAid AI</span>
            </a>
          </div>

          <div className="top-nav-links">
            <ul className="top-nav-links-ul">
              <li>
                <a href="#features" className="nav-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="nav-link">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div className="top-nav-cta">
            {/* <button 
              className="btn-nav btn-nav-secondary"
              onClick={() => navigate("/login")}
            >
              Go To Dashboard
            </button> */}
            <button
              className="btn-nav btn-nav-primary"
              onClick={handleWhatsAppConnect}
            >
              <span className="btn-icon">💬</span>
              Connect WhatsApp
            </button>
          </div>

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#features" className="mobile-menu-link">
              Features
            </a>
            <a href="#how-it-works" className="mobile-menu-link">
              How It Works
            </a>
            {/* <button 
              className="btn-nav btn-nav-secondary" 
              style={{ width: "100%" }}
              onClick={() => navigate("/dashboard")}
            >
              Go To Dashboard
            </button> */}
            <button
              className="btn-nav btn-nav-primary"
              onClick={handleWhatsAppConnect}
              style={{ width: "100%" }}
            >
              <span className="btn-icon">💬</span>
              Connect WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="hero">
        <div className="hero-bg-decoration hero-blob-1"></div>
        <div className="hero-bg-decoration hero-blob-2"></div>
        <div className="hero-bg-decoration hero-grid"></div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>AI-Powered Business Assistant</span>
            </div>

            <h1 className="hero-title">
              Sell More. Waste Less.
              <br />
              <span className="hero-highlight">Stay in Control.</span>
            </h1>

            <p className="hero-subtext">
              Track sales, manage inventory, and reorder stock by simply chatting.
              No new apps. No learning curve. Just WhatsApp and intelligence.
            </p>

            <form className="hero-input-group" onSubmit={handleGetStarted}>
              <button
                type="submit"
                className="btn-hero"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Starting...
                  </>
                ) : (
                  <>
                    <span className="btn-text">Start Free on WhatsApp</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            <p className="hero-trust-text">
              <span className="trust-icon">✓</span>
              Join 500+ retailers managing inventory smarter
            </p>
          </div>

          <div className="hero-right">
            <div className="hero-image-container">
              <div className="image-frame">
                <img
                  src={hero}
                  alt="WhatsApp chat interface showing TradeAid AI conversation"
                  className="hero-image"
                />
              </div>
              <div className="floating-badge badge-sales">
                <span className="badge-value">₦184,500</span>
                <span className="badge-label">This Week</span>
              </div>
              <div className="floating-badge badge-items">
                <span className="badge-value">+28%</span>
                <span className="badge-label">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW (PROBLEM/SOLUTION) ==================== */}
      <section className="overview" id="features">
        <div className="overview-container">
          <div className="problem-card">
            <div className="card-icon-wrapper problem-icon">
              <span className="card-icon">⚠️</span>
            </div>
            <h3 className="card-heading">Tired of This?</h3>
            <ul className="problem-list">
              <li>
                <span className="icon">❌</span>
                <span>Manual stock counting every day</span>
              </li>
              <li>
                <span className="icon">❌</span>
                <span>Running out of best-sellers</span>
              </li>
              <li>
                <span className="icon">❌</span>
                <span>Cash tied up in dead stock</span>
              </li>
              <li>
                <span className="icon">❌</span>
                <span>Guessing when to restock</span>
              </li>
            </ul>
          </div>

          <div className="cards-divider">
            <div className="divider-icon">→</div>
          </div>

          <div className="solution-card">
            <div className="card-icon-wrapper solution-icon">
              <span className="card-icon">✨</span>
            </div>
            <h3 className="card-heading">Meet Your AI Shop Assistant</h3>
            <ul className="solution-list">
              <li>
                <span className="icon">✅</span>
                <div className="solution-text">
                  <span className="command">"I sold 3 rice"</span>
                  <span className="result">→ Updates instantly</span>
                </div>
              </li>
              <li>
                <span className="icon">✅</span>
                <div className="solution-text">
                  <span className="command">"What should I reorder?"</span>
                  <span className="result">→ Smart alerts</span>
                </div>
              </li>
              <li>
                <span className="icon">✅</span>
                <div className="solution-text">
                  <span className="command">"Show today's sales"</span>
                  <span className="result">→ Real-time data</span>
                </div>
              </li>
              <li>
                <span className="icon">✅</span>
                <span>Works entirely on WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="how" id="how-it-works">
        <div className="how-bg-decoration how-blob-1"></div>
        <div className="how-bg-decoration how-blob-2"></div>

        <div className="how-content">
          <div className="how-header">
            <span className="how-label">
              <span className="label-badge">⚡</span>
              GET STARTED IN 3 STEPS
            </span>

            <h2 className="how-title">
              From chaos to clarity
              <br />
              in minutes
            </h2>
          </div>

          <div className="steps-container">
            <div className="each-step">
              <div className="step-header">
                <span className="step-number-badge">1</span>
                <h4 className="step-title">Text to Get Started</h4>
              </div>
              <p className="step-description">
                Send 'Hi' to our WhatsApp. No downloads, no forms. Instant setup.
              </p>
              <div className="step-accent"></div>
            </div>

            <div className="step-divider">
              <div className="divider-line"></div>
              <span className="divider-icon">→</span>
              <div className="divider-line"></div>
            </div>

            <div className="each-step">
              <div className="step-header">
                <span className="step-number-badge">2</span>
                <h4 className="step-title">Add Your Products</h4>
              </div>
              <p className="step-description">
                Text: "Add rice, 50 bags, ₦30,000" and start tracking. That simple.
              </p>
              <div className="step-accent"></div>
            </div>

            <div className="step-divider">
              <div className="divider-line"></div>
              <span className="divider-icon">→</span>
              <div className="divider-line"></div>
            </div>

            <div className="each-step">
              <div className="step-header">
                <span className="step-number-badge">3</span>
                <h4 className="step-title">Let AI Do the Rest</h4>
              </div>
              <p className="step-description">
                Record sales, get alerts, view analytics—all through conversation.
              </p>
              <div className="step-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <section className="why-us">
        <div className="why-container">
          <div className="why-mini-1">
            <div className="stat-wrapper">
              <h2 className="stat-number">500+</h2>
              <p className="description">Retailers managing inventory smarter</p>
            </div>
            <div className="stat-badge">Active Users</div>
          </div>

          <div className="why-mini-2">
            <h3 className="card-title">Built for How You Actually Work</h3>
            <p className="card-subtitle">
              No apps. No platforms. Just WhatsApp—the tool you use all day.
            </p>
            <div className="icon-container">
              <div className="icon-box teal">📱</div>
              <div className="arrow-swap">⇄</div>
              <div className="icon-box dark">🏪</div>
            </div>
          </div>

          <div className="why-mini-3">
            <div className="volatility-content">
              <h3 className="card-title">
                Know Your Business Like Never Before
              </h3>
              <p className="sub-text">
                AI-powered analytics tell you what's selling, what's not, and
                when to restock—before you run out.
              </p>
            </div>
            <div className="chart-mockup">
              <div className="chart-header">
                <span className="chart-summary">
                  This Week <strong>₦184,500</strong>
                </span>
                <span className="timeframe">7 Days ▾</span>
              </div>
              <div className="chart-visual">
                <div className="chart-bars">
                  <div className="bar" style={{ "--bar-height": "60%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Mon</div>
                  </div>
                  <div className="bar" style={{ "--bar-height": "80%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Tue</div>
                  </div>
                  <div className="bar" style={{ "--bar-height": "45%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Wed</div>
                  </div>
                  <div className="bar" style={{ "--bar-height": "90%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Thu</div>
                  </div>
                  <div className="bar" style={{ "--bar-height": "70%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Fri</div>
                  </div>
                  <div className="bar" style={{ "--bar-height": "85%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Sat</div>
                  </div>
                  <div className="bar" style={{ "--bar-height": "95%" } as React.CSSProperties}>
                    <div className="bar-tooltip">Sun</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="landing-cta">
        <div className="cta-bg-decoration cta-blob-1"></div>
        <div className="cta-bg-decoration cta-blob-2"></div>

        <div className="cta-section">
          <div className="cta-content">
            <span className="cta-tagline">
              <span className="tagline-icon">✨</span>
              TRY IT FREE
            </span>
            <h2 className="cta-title">
              Ready to Stop Guessing and Start Growing?
            </h2>
            <p className="cta-description">
              Join hundreds of retailers who've automated their inventory. No
              apps, no complexity—just WhatsApp and smarter decisions.
            </p>
          </div>

          <div className="cta-actions">
            <button
              className="btn btn-primary"
              onClick={handleWhatsAppConnect}
            >
              <span className="btn-icon">💬</span>
              <span className="btn-text">Connect WhatsApp</span>
              <span className="btn-arrow">↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">
              <span className="footer-icon">⚡</span>
              TradeAid AI
            </h3>
            <p className="footer-description">
              Empower your retail business with AI-powered inventory management on WhatsApp.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 TradeAid AI. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="#twitter" className="social-link">
              𝕏
            </a>
            <a href="#facebook" className="social-link">
              f
            </a>
            <a href="#linkedin" className="social-link">
              in
            </a>
          </div>
        </div>
      </footer>

      {/* ==================== BACK TO TOP BUTTON ==================== */}
      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <span className="back-to-top-arrow">↑</span>
      </button>
    </div>
  );
}