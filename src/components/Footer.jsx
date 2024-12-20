import React from "react";

import "../Footer.css";

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="social-links">
        <a href="https://www.instagram.com/coconhat_" className="social-link">
          Instagram
        </a>
        <a href="https://github.com/Coconhat" className="social-link">
          Github
        </a>
      </div>

      <div className="info-section">
        <p>Made with ❤️ by @coconhat_</p>
      </div>

      <div className="links-section"></div>

      <div className="footer-bottom"></div>
    </footer>
  );
}
