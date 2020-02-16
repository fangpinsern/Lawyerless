import { createContext } from "react";

export const ProgressContext = createContext({
  completed: 0,
  numSteps: 0,
  updateNumSteps: () => {},
  increase: () => {},
  decrease: () => {},
  reset: () => {}
});
