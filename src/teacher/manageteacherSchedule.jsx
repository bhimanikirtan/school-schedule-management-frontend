import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Card,
  Avatar,
  Divider,
  Typography,
  CardContent,
  Checkbox,
  Popper,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteScheduleData,
  getAllteacherScheduleData,
  setScheduleData,
  updateScheduleData,
} from "../thunk/scheduleThunk";
import { toast } from "react-toastify";
import { fetchUserData } from "../thunk/userThunk";
import { getAllSubjectData } from "../thunk/subjectThunk";
import EventCard from "./EventCard";

export default function ManageSchedule() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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

  const formatDateTime = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
  };

  const fetchSchedules = useCallback(async () => {
    const res = await dispatch(getAllteacherScheduleData()).unwrap();
    const mapped = (res?.allteacherSchedule || []).map((s) => {
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(getAllSubjectData());
    fetchSchedules();
  }, [dispatch, fetchSchedules]);

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

  return (
    <div className="myCalendarWrapper">
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
        eventContent={(info) => <EventCard title={info.event.title} />}
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
              boxShadow: 4,
              backgroundColor: "#F4EEE5",
              pointerEvents: "none",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Title
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {selectedEvent.title}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Checkbox
                  checked={true}
                  disabled
                  size="small"
                  sx={{
                    "&.Mui-checked": { color: "#d16f98ff" },
                    padding: 0,
                    mr: 1,
                  }}
                />
                <Typography variant="body1" fontWeight="medium">
                  Selected
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" alignItems="center" gap={4} mb={1}>
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

              <Divider sx={{ my: 1 }} />
              <Box display="flex" alignItems="center" gap={4}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Class
                  </Typography>
                  <Typography variant="body1">
                    {selectedEvent.className}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Subject
                  </Typography>
                  <Typography variant="body1">
                    {selectedEvent.subject}
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
          {user && (
            <Avatar
              src={
                user.image
                  ? `http://localhost:5000/${user.image}`
                  : "/placeholder.png"
              }
              alt={user?.name || "Teacher"}
              sx={{ mr: 2 }}
            />
          )}
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.name || (edit ? "Edit Schedule" : "Add Schedule")}
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
          {edit && (
            <TextField
              select
              label="Teacher"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value={formData.teacherId}>
                {events.find(
                  (e) => e.extendedProps.teacherId === formData.teacherId
                )?.extendedProps.teacherName || ""}
              </MenuItem>
            </TextField>
          )}

          <TextField
            label="Title (e.g., Dance Class)"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            label="Select Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            fullWidth
            size="small"
          />

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
