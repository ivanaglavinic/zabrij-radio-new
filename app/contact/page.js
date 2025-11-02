"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./contact.css";

export default function Contact() {
  const router = useRouter(); // for redirect
  const [status, setStatus] = useState(null); // idle, error, or success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        form.reset();
        // ✅ Redirect to Thank You page after success
        router.push("/contact/thank-you");
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form className="contact-form" onSubmit={handleSubmit}>
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

        {/* Display status messages */}
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
}
