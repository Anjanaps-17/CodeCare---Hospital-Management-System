import axios from "axios";

export const searchPatient = (searchValue) => {
  return axios.get(
    `/api/receptionist/patients/search?name=${searchValue}`
  );
};