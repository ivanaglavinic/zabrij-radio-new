"use client";

import { Member } from "@/components/member/Member";
import "./about.css";

export default function About() {
  return (
    <div>
      <section className="about-section">
        <p className="about-text">
          Zabrij Radio was created out of the need to establish a community
          radio in Zagreb, inspired by other European internet radios where
          profit is not the priority, but the community is.
          <br />
          We want to have a platform where everyone is welcome and where all
          forms of artistic expression have a home. As strong advocates of
          social responsibility, we promote inclusivity and pluralism.
          <br />
          The content we broadcast reflects our views on questioning established
          norms and prescribed patterns. There is not just one way of existing —
          at Zabrij Radio, we celebrate diversity.
        </p>
      </section>

      <section className="team-section">
        <h2>OUR TEAM</h2>
        <div className="team-grid">
          <Member
            name="Ivan Čipčić"
            instagram="https://www.instagram.com/chipodelic/"
            image="/images/ivan.jpeg"
          />
          <Member
            name="Kelly Glavinić"
            instagram="https://www.instagram.com/kellyglavinic/"
            image="/images/kelly.jpeg"
          />
          <Member
            name="Ivana Glavinić"
            instagram="https://www.instagram.com/ivanaglavinic/"
            image="/images/ivana.jpg"
          />
          <Member
            name="Lorena Vuletić"
            instagram="https://www.instagram.com/lorena.vuletic/"
            image="/images/lorena.jpeg"
          />
          <Member
            name="Niko Pezić"
            instagram="https://www.instagram.com/niko_pezic/"
            image="/images/nikko.png"
          />
        </div>
      </section>
    </div>
  );
}
