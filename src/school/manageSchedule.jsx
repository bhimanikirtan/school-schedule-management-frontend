import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Card,
  CardHeader,
  Avatar,
  Divider,
  Typography,
  CardContent,
  Popper,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
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
import EventCard from "./EventCard";

export default function ManageSchedule() {
  const dispatch = useDispatch();
  const { allTeachers } = useSelector((state) => state.school);
  const { allSubjects } = useSelector((state) => state.subject);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const formatDateTime = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
  };

  const fetchSchedules = useCallback(async () => {
    const res = await dispatch(getAllScheduleData(selectedTeacherId)).unwrap();
    const mapped = (res?.allSchedules || []).map((s) => {
      const teacherName = s?.teacherId?.name || "";
      const image = s?.teacherId?.image || "";
      const subject = s?.subject || "";
      const className = s?.className || "";
      const title = s?.title || "";

      return {
        id: s._id,
        title: `${teacherName} ${title ? "· " + title : ""}`,
        start: s.start,
        end: s.end,
        extendedProps: {
          teacherId: s.teacherId?._id || "",
          teacherName,
          image,
          title,
          subject,
          className,
        },
      };
    });
    setEvents(mapped);
  }, [dispatch, selectedTeacherId]);

  useEffect(() => {
    dispatch(getAllTeachersData());
    dispatch(getAllSubjectData());
  }, [dispatch]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

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
            teacherId: formData.teacherId,
            title: formData.title,
            subject: formData.subject,
            className: formData.className,
            start: new Date(formData.start).toISOString(),
            end: new Date(formData.end).toISOString(),
          })
        ).unwrap();
        toast.success(res.msg);
      } else {
        const res = await dispatch(
          setScheduleData({
            teacherId: formData.teacherId,
            title: formData.title,
            subject: formData.subject,
            className: formData.className,
            start: new Date(formData.start).toISOString(),
            end: new Date(formData.end).toISOString(),
          })
        ).unwrap();
        toast.success(res.msg);
      }
      await fetchSchedules();
      handleClose();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
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
        teacherId: info.event.extendedProps.teacherId,
        title: info.event.extendedProps.title,
        subject: info.event.extendedProps.subject,
        className: info.event.extendedProps.className,
        start: info.event.start?.toISOString(),
        end: info.event.end?.toISOString(),
      })
    ).unwrap();
    fetchSchedules();
  };

  const handleEventResize = async (info) => {
    await dispatch(
      updateScheduleData({
        id: info.event.id,
        teacherId: info.event.extendedProps.teacherId,
        title: info.event.extendedProps.title,
        subject: info.event.extendedProps.subject,
        className: info.event.extendedProps.className,
        start: info.event.start?.toISOString(),
        end: info.event.end?.toISOString(),
      })
    ).unwrap();
    fetchSchedules();
  };

  const handleEventHover = (info) => {
    setSelectedEvent({
      teacherName: info.event.extendedProps.teacherName,
      image: info.event.extendedProps.image,
      title: info.event.extendedProps.title,
      start: info.event.start,
      end: info.event.end,
      className: info.event.extendedProps.className,
      subject: info.event.extendedProps.subject,
      anchorEl: info.el,
    });
  };

  const handleEventLeave = () => setSelectedEvent(null);

  const selectedTeacher =
    allTeachers.find((t) => t._id === formData.teacherId) || null;

  return (
    <div className="myCalendarWrapper">
      <Box sx={{ p: 2, pb: 0 }}>
        <TextField
          select
          label="Filter by Teacher"
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Teachers</MenuItem>
          {allTeachers.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        editable
        selectable
        eventMouseEnter={handleEventHover}
        eventMouseLeave={handleEventLeave}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,title,next",
          right: "",
        }}
        eventContent={(info) => (
          <EventCard
            teacherName={info.event.extendedProps.teacherName}
            image={info.event.extendedProps.image}
          />
        )}
      />

      {selectedEvent && (
        <Popper
          open={Boolean(selectedEvent)}
          anchorEl={selectedEvent.anchorEl}
          placement="right-start"
          style={{ zIndex: 1000 }}
        >
          <Card
            sx={{
              width: 280,
              borderRadius: 2,
              boxShadow: 4,
              backgroundColor: "#F4EEE5",
              pointerEvents: "none",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={
                    selectedEvent.image
                      ? `http://localhost:5000/${selectedEvent.image}`
                      : "/placeholder.png"
                  }
                  alt={selectedEvent.teacherName || "Teacher"}
                />
              }
              title={
                <Typography variant="subtitle1" fontWeight="bold">
                  {selectedEvent.teacherName || "—"}
                </Typography>
              }
              sx={{ pb: 0 }}
            />

            <Box display="flex" alignItems="center" px={2} py={1}>
              <Typography
                variant="body2"
                color="success.main"
                sx={{ fontSize: 14 }}
              >
                ✔ Matched on{" "}
                {new Date(selectedEvent.start).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </Box>

            <Divider />

            <CardContent sx={{ pt: 1, pb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 12, mb: 0.5 }}
              >
                Subject
              </Typography>
              <Typography variant="body1" fontWeight="medium" mb={1}>
                {selectedEvent.subject || "—"}
              </Typography>

              <Box display="flex" gap={2} mb={1}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Start Time
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedEvent.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    End Time
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedEvent.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Class
                  </Typography>
                  <Typography variant="body1">
                    {selectedEvent.className || "—"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Title
                  </Typography>
                  <Typography variant="body1">
                    {selectedEvent.title || "—"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Popper>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: "#F4EEE5",
            width: 420,
            p: 0,
          },
        }}
      >
        <Box display="flex" alignItems="center" p={2} pb={1}>
          {selectedTeacher && (
            <Avatar
              src={
                selectedTeacher.image
                  ? `http://localhost:5000/${selectedTeacher.image}`
                  : "/placeholder.png"
              }
              alt={selectedTeacher?.name || "Teacher"}
              sx={{ mr: 2 }}
            />
          )}
          <Typography variant="subtitle1" fontWeight="bold">
            {selectedTeacher?.name || (edit ? "Edit Schedule" : "Add Schedule")}
          </Typography>
        </Box>

        {edit && formData.start && (
          <Box display="flex" alignItems="center" px={2} py={1}>
            <Typography
              variant="body2"
              color="success.main"
              sx={{ fontSize: 14 }}
            >
              ✔ Scheduled for{" "}
              {new Date(formData.start).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              })}
            </Typography>
          </Box>
        )}

        <Divider />

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
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

          <TextField
            label="Title (e.g., Dance Class)"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            size="small"
          />
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

          <TextField
            label="Class Name (e.g., 7A, 7B)"
            name="className"
            value={formData.className}
            onChange={handleChange}
            fullWidth
            size="small"
          />

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
