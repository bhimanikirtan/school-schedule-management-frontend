import api from "../service/api";

export const getAllTeachersAPI = async () => {
  const response = await api.get(`school/getAllteachers`);
  return response.data;
};
