"use client";

import React, { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkgpeweg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        // Optional redirect to a thank-you page
        window.location.href = "/thank-you.html";
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">FULL NAME</label>
        <input type="text" id="name" name="name" required />

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

        {status === "success" && (
          <p className="status">Thank you! Redirecting…</p>
        )}
        {status === "error" && (
          <p className="status">Oops! Something went wrong. Try again.</p>
        )}
      </form>
    </div>
  );
}
