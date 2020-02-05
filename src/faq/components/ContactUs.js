import React from "react";

import "./ContactUs.css";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../shared/util/validators";

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

  const faqSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
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
      />
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />
      <Input
        id="question"
        element="textarea"
        type="text"
        label="Question"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid question."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>Submit</Button>
    </form>
  );
}

export default ContactUs;
