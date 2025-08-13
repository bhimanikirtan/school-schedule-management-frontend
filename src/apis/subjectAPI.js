import api from "../service/api";

export const addSubjectAPI = async (values) => {
  const response = await api.post(`subject/addSubject`, values);
  return response.data;
};
export const getAllSubjectAPI = async () => {
  const response = await api.get(`subject/getAllSubjects`);
  return response.data;
};
export const updateSubjectAPI = async ({id, values}) => {
  const response = await api.put(`subject/updateSubject/${id}`, values);
  return response.data;
};
export const deleteSubjectAPI = async (id) => {
  const response = await api.delete(`subject/deleteSubject/${id}`);
  return response.data;
};
