/* eslint-disable @next/next/no-img-element */

import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <img
          src="/images/background.jpg"
          alt="Zabrij Radio Cover"
          className="home-hero-image"
        />
      </div>
    </div>
  );
}
