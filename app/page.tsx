import Image from "next/image";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <Image
          src="/images/background.jpg"
          alt="Zabrij Radio Cover"
          fill
          priority
          className="home-hero-image"
        />
      </div>
    </div>
  );
}
