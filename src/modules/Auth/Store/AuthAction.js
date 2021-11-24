import Invoke from "../../../app/axios/Invoke";

export const handleSubmitLogin = async (values) => {
  const { username, password } = values;
  const payload = { username, password };
  const { data } = await Invoke.submitLogin(payload);
  console.log("=== data : ", data);
};
