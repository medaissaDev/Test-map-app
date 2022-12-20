import axios from "axios";

export const getPaths = () => {
  return axios.get("http://localhost:8080/api/paths");
};

export const savePath = (pathName, markers) => {
  const body = { pathName: pathName, locations: markers };
  return axios.post("http://localhost:8080/api/paths", body);
};
