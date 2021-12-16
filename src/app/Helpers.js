import history from "./History";

export const navigate = (path) => {
  history.push(path);
  window.location.reload();
};
