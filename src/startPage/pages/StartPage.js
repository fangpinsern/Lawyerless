import React, { useContext, useState, useEffect } from "react";

// Imports from local components
import { ProgressContext } from "../../shared/context/progressBar-context";
import CaseType from "../components/CaseType";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE,
  VALIDATOR_NUMBER
} from "../../shared/util/validators";

// Imports for styling
import "./StartPage.css";
import { useForm } from "../../shared/hooks/form-hooks";
import GeneralForm from "../components/GeneralForm";
import moment from "moment";
import MagistratesCourts from "../components/MagistratesCourts";
import RespondingContest from "../components/RespondingContest";

function StartPage() {
  // Progress bar context
  const progress = useContext(ProgressContext);
  const nextStepHandler = () => {
    progress.increase();
  };
  const previousStepHandler = () => {
    progress.decrease();
  };
  const resetHandler = () => {
    progress.reset();
    localStorage.removeItem("magForm");
  };
  // End progress bar context

  const formStorage = {
    "Commencing An Action": {
      "Property Damage": {
        dateOfIncident: {
          value: "",
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_DATE()],
          type: "input",
          output:
            "If the incident is within 6 years, you are still within the time limit to sue. Unfortunately, if it has been more than 6 years, the time limit for commencing an action for property damage has passed.",
          placeholder: "DD/MM/YYYY",
          label: "Date",
          errorText: "Please enter a valid date and format (DD/MM/YYYY).",
          isValid: false
        },
        valueOfClaim: {
          value: 0,
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
          type: "input",
          output:
            "Information on how to calculate value of claim for property damage",
          placeholder: "Value of claim",
          label: "Value of claim",
          errorText: "Please enter a valid value",
          isValid: false
        },
        end: {
          type: "output",
          output: "",
          endFunction: (dateOfIncident, valueOfClaim) => {
            // If dateOfIncident within 6 years, can sue - show procedures to suing
            // Process dependent on value you are suing for
            let output = "";
            const sixYearAgo = moment()
              .subtract(6, "years")
              .format("DD/MM/YYYY");
            const sixYearsHavePassed = moment(sixYearAgo, "DD/MM/YYYY").isAfter(
              dateOfIncident,
              "day"
            );
            if (sixYearsHavePassed) {
              output = (
                <h2>
                  Unfortunately, the time limit for commencing an action for
                  personal injury has passed.
                </h2>
              );
            } else {
              const x = parseInt(valueOfClaim);
              switch (true) {
                case x < 20000:
                  output = (
                    <h2>
                      Your Claim needs to be filed in the Small Claims Tribunal.
                    </h2>
                  );
                  break;
                case x < 30000:
                  output = (
                    <h2>
                      If you and the Respondent both agree, this claim can be
                      filed in the Small Claims Tribunal. Otherwise, then it
                      needs to be filed in the Magistrate's Court.
                    </h2>
                  );
                  break;
                case x < 60000:
                  output = <MagistratesCourts />;
                  break;
                default:
                  output = (
                    <h2>
                      Your claim needs to be filed in either the District Court
                      or the Hight Court based on the value of your claim. You
                      ought to consult a lawyer for advice.
                    </h2>
                  );
              }
            }
            return output;
          },
          isValid: true
        }
      },
      "Personal Injury": {
        dateOfIncident: {
          value: "",
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_DATE()],
          type: "input",
          output:
            "If the incident is within 3 years, you are still within the time limit to sue. Unfortunately, if it has been more than 3 years, the time limit for commencing an action for personal injury has passed.",
          placeholder: "DD/MM/YYYY",
          label: "Date",
          errorText: "Please enter a valid date and format (DD/MM/YYYY).",
          isValid: false
        },
        valueOfClaim: {
          value: 0,
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
          type: "input",
          output:
            "There are two categories of compensation that the Court awards for personal injury cases. The first is special damages, which are losses or expenses incurred during the accident, such as medical expenses, loss of income during recovery, etc. The second, more complicated type, is general damages, which includes factors such as pain and suffering, loss of future earning, etc. ",
          placeholder: "Value of claim",
          label: "Value of claim",
          errorText: "Please enter a valid value",
          isValid: false
        },
        end: {
          type: "output",
          output: "",
          endFunction: (dateOfIncident, valueOfClaim) => {
            // If dateOfIncident within 3 years, can sue - show procedures to suing
            // Process dependent on value you are suing for
            let output = "";
            const threeYearAgo = moment()
              .subtract(3, "years")
              .format("DD/MM/YYYY");
            const threeYearsHavePassed = moment(
              threeYearAgo,
              "DD/MM/YYYY"
            ).isAfter(dateOfIncident, "day");
            console.log(threeYearsHavePassed);
            if (threeYearsHavePassed) {
              output = (
                <h2>
                  Unfortunately, the time limit for commencing an action for
                  personal injury has passed.
                </h2>
              );
            } else {
              const x = parseInt(valueOfClaim);
              switch (true) {
                case x < 20000:
                  output = (
                    <h3>
                      Your Claim needs to be filed in the Small Claims Tribunal.
                    </h3>
                  );
                  break;
                case x < 30000:
                  output = (
                    <h3>
                      If you and the Respondent both agree, this claim can be
                      filed in the Small Claims Tribunal. Otherwise, then it
                      needs to be filed in the Magistrate's Court.
                    </h3>
                  );
                  break;
                case x < 60000:
                  output = <MagistratesCourts />;
                  break;
                default:
                  output = (
                    <h3>
                      Your claim needs to be filed in either the District Court
                      or the Hight Court based on the value of your claim. You
                      ought to consult a lawyer for advice.
                    </h3>
                  );
              }
            }
            return output;
          },
          isValid: true
        }
      }
    },
    "Responding To An Action": {
      "Contest Claim": {
        end: {
          type: "output",
          output: "",
          endFunction: () => {
            return <RespondingContest />;
          },
          isValid: true
        }
      },
      "Do Not Contest Claim": {
        end: {
          type: "output",
          output: "",
          endFunction: () => {
            return <h2>Follow instructions given in the summon.</h2>;
          },
          isValid: true
        }
      }
    }
  };

  // Action types
  const arrayOfAction = Object.keys(formStorage);

  // Check which action
  const [actionType, setActionType] = useState(arrayOfAction[0]);
  // End Check which action

  // Form types
  const arrayOfForms = Object.keys(formStorage[actionType]);

  // Check which from is being used
  const [formType, setFormType] = useState(arrayOfForms[0]);
  // End Check which from is being used

  // Choose which form to use from form storage
  const chosenForm = formStorage[actionType][formType];

  const [
    committingFormState,
    committingFormInputHandler,
    setFormData
  ] = useForm(chosenForm, false);

  const setFormTypeWrapper = value => {
    setFormData(formStorage[actionType][value], false);
    setFormType(value);
  };
  // End choose which form to use from form storage

  // Local Storage
  useEffect(() => {
    const data = localStorage.getItem("committing-form-inputs");
    const isValid = localStorage.getItem("committing-form-isValid") === "true";
    const compressedFunc = localStorage.getItem(
      "committing-form-inputs-endFunction"
    );

    if (data) {
      const parseData = JSON.parse(data);
      parseData.end.endFunction = eval("(" + compressedFunc + ")");
      setFormData(parseData, isValid);
    }
  }, [setFormData]);

  useEffect(() => {
    localStorage.setItem(
      "committing-form-inputs",
      JSON.stringify(committingFormState.inputs)
    );
    localStorage.setItem(
      "committing-form-isValid",
      JSON.stringify(committingFormState.isValid)
    );
    localStorage.setItem(
      "committing-form-inputs-endFunction",
      committingFormState.inputs.end.endFunction.toString()
    );
    // console.log("i am here")
  });
  // End Local Storage

  const actionOrReaction =
    actionType === arrayOfAction[0]
      ? "What would you like to take action for?"
      : "Would you like to contest the claim?";

  const arrayOfInputs = Object.keys(committingFormState.inputs);

  const arrayOfInputsReturned = arrayOfInputs.map((input, i) => {
    return (
      <GeneralForm
        key={i}
        formFieldId={input}
        validators={committingFormState.inputs[input].validators}
        type={committingFormState.inputs[input].type}
        output={committingFormState.inputs[input].output}
        outputFunction={committingFormState.inputs[input].endFunction}
        nextStep={nextStepHandler}
        prevStep={previousStepHandler}
        reset={resetHandler}
        formData={committingFormState}
        formDataInputHandler={committingFormInputHandler}
        label={committingFormState.inputs[input].label}
        errorText={committingFormState.inputs[input].errorText}
        inputType="input"
        placeholder={committingFormState.inputs[input].placeholder}
      />
    );
  });

  progress.updateNumSteps(arrayOfInputs.length + 1);

  // Progress of the user
  const step = progress.completed;

  // At different steps, different parts of the form will render
  switch (step) {
    case 0:
      return (
        <CaseType
          key={0}
          nextStep={nextStepHandler}
          setFormType={setActionType}
          formtype={actionType}
          optionsAvailable={arrayOfAction}
          label="What would you like to do?"
        />
      );
    case 1:
      return (
        <CaseType
          key={1}
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          setFormType={setFormTypeWrapper}
          formtype={formType}
          optionsAvailable={arrayOfForms}
          label={actionOrReaction}
        />
      );
    default:
      return arrayOfInputsReturned[step - 2];
  }
}

export default StartPage;
