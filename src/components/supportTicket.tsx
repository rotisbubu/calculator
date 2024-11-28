import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function SupportTicket() {
  const ticketNumber = Math.floor(1000 + Math.random() * 9000);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="support-form">
      <div className="page-header">
        <h1>Support Ticket Form</h1>
        <hr className="line" />
      </div>
      <div className="support-message">
        <h1>
          Thank you for sending us your report, we will track the problem now
        </h1>
        <p>
          ticket number: <strong>{ticketNumber}</strong>
        </p>
      </div>
    </div>
  );
}
