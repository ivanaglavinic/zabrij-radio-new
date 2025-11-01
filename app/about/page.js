"use client";

import { Member } from "@/components/member/Member";
import "./about.css";

export default function About() {
  return (
    <div>
      <section className="about-section">
        <p className="about-text">
          Zabrij radio nastao je iz potrebe da se u Zagrebu stvori community
          radio, po uzoru na druge europske internetske radije, kojima profit
          nije na prvom mjestu, već zajednica.
          <br />
          Želimo imati platformu na kojoj je svatko dobrodošao i gdje svi
          umjetnički izražaji imaju svoj dom. Kao veliki zagovornici društvene
          odgovornosti, zalažemo se za inkluzivnost i pluralizam.
          <br />
          Sadržaj koji emitiramo odražava naše stavove o propitkivanju
          ustaljenih normi i zadanih obrazaca. Ne postoji samo jedan način
          postojanja – na Zabrij radiju slavimo različitosti.
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
