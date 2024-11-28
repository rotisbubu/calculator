import React, { useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";

export default function SupportPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const allowedDomains = [
    "@binus.ac.id",
    "@binus.edu",
    "@gmail.com",
    "@yahoo.com",
  ];

  const validateEmail = (email: string) => {
    return allowedDomains.some((domain) => email.endsWith(domain));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setShowModal(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/SupportTicket");
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="support-form">
      <div className="page-header">
        <h1>Support Ticket Form</h1>
        <hr className="line" />
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Name <span className="required">*</span>
                </label>
                <div className="name-fields">
                  <input
                    type="text"
                    placeholder="First"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  className="input-email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Topic <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <div className="text">What can we help you today?</div>
                  <div className="radio-part">
                    <input
                      type="radio"
                      id="general"
                      name="topic"
                      value="General"
                      onChange={(e) => setTopic(e.target.value)}
                    />
                    <label className="general">General</label>
                  </div>
                  <div className="radio-part">
                    <input
                      type="radio"
                      id="bug"
                      name="topic"
                      value="Bug"
                      onChange={(e) => setTopic(e.target.value)}
                    />
                    <label className="bug">Bug</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <div className="desc-label">
                  <label className="text">Description</label>
                  <label className="optional">optional</label>
                </div>

                <textarea
                  placeholder="Description Report"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <button
            className="submit-btn"
            type="submit"
            disabled={
              isSubmitting || !firstName || !lastName || !email || !topic
            }
          >
            {isSubmitting ? "SEND" : "SEND"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              X
            </span>
            <h3>FAILED TO SEND</h3>
            <hr />
            <p>
              Sorry, email must ended with <strong>"@binus.ac.id"</strong> or{" "}
              <strong>"@binus.edu"</strong>
              or <strong>"@gmail.com"</strong> or <strong>"@yahoo.com"</strong>.
              Please input the correct email!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
