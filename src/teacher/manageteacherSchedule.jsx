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
import "../school/ManageSchedule.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteScheduleData,
  getAllteacherScheduleData,
  setScheduleData,
  updateScheduleData,
} from "../thunk/scheduleThunk";
import { toast } from "react-toastify";
import { fetchUserData } from "../thunk/userThunk";

export default function ManageteacherSchedule() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(fetchUserData());
    fetchSchedules();
  }, [dispatch]);

  const fetchSchedules = async () => {
    const res = await dispatch(getAllteacherScheduleData()).unwrap();
    console.log(res.allteacherSchedule, "teacherSchedule");

    setEvents(
      res.allteacherSchedule.map((s) => ({
        id: s._id,
        title: `${s.title} (${s.teacherId?.name || ""})`,
        start: s.start,
        end: s.end,
        extendedProps: {
          teacherId: s.teacherId?._id,
          originalTitle: s.title,
        },
      }))
    );
  };

  const handleDateClick = (info) => {
    setEdit(false);
    setEditId("");
    setTitle("");
    setTeacherId("");
    const localDateTime = info.date
      .toLocaleString("sv-SE", { hour12: false })
      .replace(" ", "T");
    console.log(localDateTime);
    setStart(localDateTime);
    setEnd(localDateTime);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (edit) {
        const res = await dispatch(
          updateScheduleData({
            id: editId,
            title,
            teacherId,
            start,
            end,
          })
        ).unwrap();
        toast.success(res.msg);
      } else {
        const newEvent = {
          teacherId: user?._id || "",
          title,
          start,
          end,
        };

        const res = await dispatch(setScheduleData(newEvent)).unwrap();
        toast.success(res.msg);
      }
      await fetchSchedules();
      setOpen(false);
      setTeacherId("");
      setTitle("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const handleDelete = async () => {
    const res = await dispatch(deleteScheduleData(editId)).unwrap();
    toast.success(res.msg);
    await fetchSchedules();
    setOpen(false);
    setTeacherId("");
    setTitle("");
    setEditId("");
    setEdit(false);
  };
  const handleEventClick = async (info) => {
    console.log(info.event.extendedProps.teacherId, "teacherId");

    setEdit(true);
    setOpen(true);
    setTeacherId(info.event.extendedProps.teacherId || "");
    setTitle(info.event.extendedProps.originalTitle || "");
    setEditId(info.event.id);
    const formatDateForInput = (date) => {
      const tzOffset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 16);
      return localISOTime;
    };
    setStart(formatDateForInput(info.event.start));
    setEnd(formatDateForInput(info.event.end || info.event.start));
  };

  const handleEventDrop = async (info) => {
    const res = await dispatch(
      updateScheduleData({
        id: info.event.id,
        teacherId: info.event.extendedProps.teacherId,
        title: info.event.extendedProps.originalTitle,
        start: info.event.start,
        end: info.event.end,
      })
    );
    toast.success(res.msg);
    fetchSchedules();
  };

  const handleEventResize = async (info) => {
    const res = await dispatch(
      updateScheduleData({
        id: info.event.id,
        teacherId: info.event.extendedProps.teacherId,
        title: info.event.extendedProps.originalTitle,
        start: info.event.start,
        end: info.event.end,
      })
    );
    toast.success(res.msg);
    fetchSchedules();
  };

  return (
    <div className="myCalendarWrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
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
          {edit ? (
            <TextField
              select
              label="Teacher"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value={teacherId}>
                {events
                  .find((e) => e.extendedProps.teacherId === teacherId)
                  ?.title.split(" (")[1]
                  ?.replace(")", "") || ""}
              </MenuItem>
            </TextField>
          ) : (
            <></>
          )}

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            size="small"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              type="datetime-local"
              label="Start Time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
            <TextField
              type="datetime-local"
              label="End Time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            color="inherit"
            variant="outlined"
          >
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
