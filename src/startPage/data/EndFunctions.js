import React from "react";
import moment from "moment";
import MagistratesCourts from "../components/MagistratesCourts";
import RespondingContest from "../components/RespondingContest";

export const EndFunctions = endFuncName => {
  switch (endFuncName) {
    case "propertyDamage":
      return (dateOfIncident, valueOfClaim) => {
        // If dateOfIncident within 6 years, can sue - show procedures to suing
        // Process dependent on value you are suing for
        let output = "";
        const sixYearAgo = moment(this, "DD/MM/YYYY")
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
                  If you and the Respondent both agree, this claim can be filed
                  in the Small Claims Tribunal. Otherwise, then it needs to be
                  filed in the Magistrate's Court.
                </h2>
              );
              break;
            case x < 60000:
              output = <MagistratesCourts />;
              break;
            default:
              output = (
                <h2>
                  Your claim needs to be filed in either the District Court or
                  the Hight Court based on the value of your claim. You ought to
                  consult a lawyer for advice.
                </h2>
              );
          }
        }
        return output;
      };

    case "personalInjury":
      return (dateOfIncident, valueOfClaim) => {
        // If dateOfIncident within 3 years, can sue - show procedures to suing
        // Process dependent on value you are suing for
        let output = "";
        const threeYearAgo = moment()
          .subtract(3, "years")
          .format("DD/MM/YYYY");
        const threeYearsHavePassed = moment(threeYearAgo, "DD/MM/YYYY").isAfter(
          dateOfIncident,
          "day"
        );
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
                  If you and the Respondent both agree, this claim can be filed
                  in the Small Claims Tribunal. Otherwise, then it needs to be
                  filed in the Magistrate's Court.
                </h3>
              );
              break;
            case x < 60000:
              output = <MagistratesCourts />;
              break;
            default:
              output = (
                <h3>
                  Your claim needs to be filed in either the District Court or
                  the Hight Court based on the value of your claim. You ought to
                  consult a lawyer for advice.
                </h3>
              );
          }
        }
        return output;
      };
    case "contestClaim":
      return () => {
        return <RespondingContest />;
      };
    case "uncontestClaim":
      return () => {
        return <h2>Follow instructions given in the summon.</h2>;
      };

    default:
      return;
  }
};
