import api from "../service/api";

export const setScheduleAPI = async (values) => {
  console.log(values);

  const response = await api.post(`schedule/setSchedule`, values);
  return response.data;
};

export const getAllScheduleAPI = async () => {
  const response = await api.get(`schedule/getAllschedules`);
  return response.data;
};
export const updateScheduleAPI = async ({
  id,
  teacherId,
  title,
  start,
  end,
}) => {
  const response = await api.put(`schedule/updateSchedule/${id}`, {
    teacherId,
    title,
    start,
    end,
  });
  return response.data;
};
export const deleteScheduleAPI = async (id) => {
  const response = await api.delete(`schedule/deleteSchedule/${id}`);
  return response.data;
};
