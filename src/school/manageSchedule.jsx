import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./ManageSchedule.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachersData } from "../thunk/schoolThunk";
import {
  deleteScheduleData,
  getAllScheduleData,
  setScheduleData,
  updateScheduleData,
} from "../thunk/scheduleThunk";
import { toast } from "react-toastify";
import { getAllSubjectData } from "../thunk/subjectThunk";

export default function ManageSchedule() {
  const dispatch = useDispatch();
  const { allTeachers } = useSelector((state) => state.school);
  const { allSubjects } = useSelector((state) => state.subject);

  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: "",
    title: "",
    subject: "",
    className: "",
    start: "",
    end: "",
  });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(getAllTeachersData());
    dispatch(getAllSubjectData());
    fetchSchedules();
  }, [dispatch]);

  const fetchSchedules = async () => {
    const res = await dispatch(getAllScheduleData()).unwrap();
    setEvents(
      res.allSchedules.map((s) => ({
        id: s._id,
        start: s.start,
        end: s.end,
        extendedProps: {
          teacherId: s.teacherId?._id,
          teacherName: s.teacherId?.name || "",
          image: s.teacherId?.image,
          title: s.title || "",
          subject: s.subject || "",
          className: s.className || "",
        },
      }))
    );
  };

  const handleDateClick = (info) => {
    setEdit(false);
    setEditId("");
    setFormData({
      teacherId: "",
      title: "",
      subject: "",
      className: "",
      start: formatDateTime(info.date),
      end: formatDateTime(info.date),
    });
    setOpen(true);
  };

  const handleEventClick = (info) => {
    setEdit(true);
    setEditId(info.event.id);
    setFormData({
      teacherId: info.event.extendedProps.teacherId || "",
      title: info.event.extendedProps.title || "",
      subject: info.event.extendedProps.subject || "",
      className: info.event.extendedProps.className || "",
      start: formatDateTime(info.event.start),
      end: formatDateTime(info.event.end || info.event.start),
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      if (edit) {
        const res = await dispatch(
          updateScheduleData({
            id: editId,
            ...formData,
          })
        ).unwrap();
        toast.success(res.msg);
      } else {
        const res = await dispatch(setScheduleData(formData)).unwrap();
        toast.success(res.msg);
      }
      await fetchSchedules();
      handleClose();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteScheduleData(editId)).unwrap();
    toast.success(res.msg);
    await fetchSchedules();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      teacherId: "",
      title: "",
      subject: "",
      className: "",
      start: "",
      end: "",
    });
    setEditId("");
    setEdit(false);
  };

  const handleEventDrop = async (info) => {
    await dispatch(
      updateScheduleData({
        id: info.event.id,
        ...info.event.extendedProps,
        start: info.event.start,
        end: info.event.end,
      })
    ).unwrap();
    fetchSchedules();
  };

  const handleEventResize = async (info) => {
    await dispatch(
      updateScheduleData({
        id: info.event.id,
        ...info.event.extendedProps,
        start: info.event.start,
        end: info.event.end,
      })
    ).unwrap();
    fetchSchedules();
  };

  const formatDateTime = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
  };

  return (
    <div className="myCalendarWrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // 👈 Shows one week
        events={events}
        editable
        selectable
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          // right: "timeGridDay,timeGridWeek,dayGridMonth", // 👈 Optional buttons
        }}
        eventContent={(info) => {
          const { teacherName, image } = info.event.extendedProps;

          return (
            <div className="custom-event-card">
              <img
                src={`http://localhost:5000/${image}`}
                alt={teacherName}
                className="teacher-avatar"
              />
              <span className="teacher-name">{teacherName}</span>
              <span className="check-icon">✔</span>
            </div>
          );
        }}
      />

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {edit ? "Edit Schedule" : "Add Schedule"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 1,
          }}
        >
          {/* Teacher */}
          <TextField
            select
            label="Select Teacher"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            {allTeachers.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Custom Title */}
          <TextField
            label="Title (e.g., Dance Class)"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          {/* Subject */}
          <TextField
            select
            label="Select Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            {allSubjects.map((s) => (
              <MenuItem key={s._id} value={s.subject}>
                {s.subject}
              </MenuItem>
            ))}
          </TextField>

          {/* Class Name */}
          <TextField
            label="Class Name (e.g., 7A, 7B)"
            name="className"
            value={formData.className}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          {/* Start / End */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              type="datetime-local"
              label="Start Time"
              name="start"
              value={formData.start}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
            <TextField
              type="datetime-local"
              label="End Time"
              name="end"
              value={formData.end}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>

          {edit && (
            <Button onClick={handleDelete} color="error" variant="outlined">
              Delete
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ bgcolor: "primary.main" }}
          >
            {edit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
