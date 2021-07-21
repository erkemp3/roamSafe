/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { useState } from "react";

export const useForm = (initial) => {
  const [values, setValues] = useState(initial);

  const setValuesHandler = (event) => {
    if (event.target.type === "checkbox") {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const resetValuesHandler = (event) => {
    event.preventDefault();
    setValues(initial);
  };

  return [values, setValuesHandler, resetValuesHandler];
};
