import React from "react";
import axios from "axios";

import "./ContactUs.css";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

import { useForm } from "../../shared/hooks/form-hooks";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../../shared/util/validators";

function ContactUs() {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      question: {
        value: "",
        isValid: false
      }
    },
    false
  );

  function resetForm() {
    window.location.reload();
  }

  const faqSubmitHandler = event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const question = document.getElementById("question").value;

    axios({
      method: "POST",
      url: "http://localhost:3001/send",
      data: {
        name: name,
        email: email,
        question: question
      }
    }).then(res => {
      if (res.data.msg === "success") {
        alert("Question sent. We will reply to your email as soon as possible");
        resetForm();
        console.log(formState);
      } else if (res.data.msg === "fail") {
        alert("Question failed to send. Please try again.");
      }
    });

    console.log(name + " " + email + " " + question);
  };

  return (
    <form className="contact-form" onSubmit={faqSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={formState.inputs.name.value}
        initialValid={formState.inputs.name.isValid}
      />
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
        initialValue={formState.inputs.email.value}
        initialValid={formState.inputs.email.isValid}
      />
      <Input
        id="question"
        element="textarea"
        type="text"
        label="Question"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid question."
        onInput={inputHandler}
        initialValue={formState.inputs.question.value}
        initialValid={formState.inputs.question.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Submit
      </Button>
    </form>
  );
}

export default ContactUs;
