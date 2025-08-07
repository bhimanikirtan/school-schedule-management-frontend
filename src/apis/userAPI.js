import api from "../service/api";

export const schoolRegisterAPI = async (values) => {
  const response = await api.post(`school/schoolRegister`, values);
  return response.data;
};
export const schoolLoginAPI = async (values) => {
  const response = await api.post(`school/schoolLogin`, values);
  return response.data;
};
