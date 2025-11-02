import "./thank-you.css";

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <div className="thank-you-container">
        <div className="checkmark">✓</div>
        <h1>Thank you for your message!</h1>
        <p>
          We’ve received your message and our team will get back to you as soon
          as possible.
        </p>
        <p className="radio-signoff"> - Zabrij Radio Team</p>
      </div>
    </main>
  );
}
