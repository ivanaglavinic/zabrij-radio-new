"use client";

import "./contact.css";
import React from "react";

export default function Contact() {
  return (
    <div>
      <form
        className="contact-form"
        name="contact"
        method="POST"
        action="process-form.php"
      >
        <label htmlFor="name">FULL NAME</label>
        <input type="text" id="name" name="fullname" required />

        <label htmlFor="email">EMAIL</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">MESSAGE</label>
        <textarea
          id="message"
          name="message"
          placeholder="..."
          minLength={5}
          rows={10}
          required
        ></textarea>

        <button className="button-form" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
}
