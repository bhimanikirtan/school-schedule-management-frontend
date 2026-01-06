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
  const response = await api.post(`teacher/teacherRegister`, values);
  return response.data;
};
export const fetchUserAPI = async () => {
  const response = await api.get(`login/fetchUser`);
  return response.data;
};
export const updateProfileAPI = async (values) => {
  const response = await api.put(`login/updateProfile`, values);
  return response.data;
};
