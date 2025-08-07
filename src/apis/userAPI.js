import api from "../service/api";

export const schoolRegisterAPI = async (values) => {
  const response = await api.post(`school/schoolRegister`, values);
  return response.data;
};
export const loginAPI = async (values) => {
  const response = await api.post(`login/`, values);
  return response.data;
};
export const sendEmailAPI = async (email) => {
  const response = await api.post(`school/sendEmail`, { email });
  return response.data;
};
export const teacherRegisterAPI = async (values) => {
  console.log(values, "values");

  const response = await api.post(`teacher/teacherRegister`, values);
  return response.data;
};
