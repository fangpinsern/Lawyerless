import React from "react";

import "./ContactUs.css";
import Button from "../../shared/components/FormElements/Button";

function ContactUs() {
  return (
    <from className="contact-form">
      <div className="form-control">
        <label>Name</label>
        <input type="text" name="name" />
      </div>
      <div className="form-control">
        <label>Email</label>
        <input type="text" name="email" />
      </div>
      <div className="form-control">
        <label>Question</label>
        <textarea type="text" name="question" rows={5} />
      </div>
      <Button type="submit">Submit</Button>
    </from>
  );
}

export default ContactUs;
