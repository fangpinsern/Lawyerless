import { createContext } from "react";

export const ProgressContext = createContext({
  completed: 0,
  numSteps: 0,
  increase: () => {},
  decrease: () => {}
});
