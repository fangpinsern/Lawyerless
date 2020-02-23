import {
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE,
  VALIDATOR_NUMBER
} from "../../shared/util/validators";

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
          "The value of your claim should depend on the value of the damaged property.",
        placeholder: "Value of claim",
        label: "Value of claim",
        errorText: "Please enter a valid value",
        isValid: false
      },
      end: {
        type: "output",
        output: "",
        endFunction: "propertyDamage",
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
        endFunction: "personalInjury",
        isValid: true
      }
    }
  },
  "Responding To An Action": {
    "Contest Claim": {
      end: {
        type: "output",
        output: "",
        endFunction: "contestClaim",
        isValid: true
      }
    },
    "Do Not Contest Claim": {
      end: {
        type: "output",
        output: "",
        endFunction: "uncontestClaim",
        isValid: true
      }
    }
  }
};

export default formStorage;
