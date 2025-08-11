import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,    
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function ManageSchedule() {
  const [events, setEvents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);

  // Form state
  const [teacherId, setTeacherId] = useState("");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    fetchTeachers();
    fetchSchedules();
  }, []);

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:5000/api/teachers");
    setTeachers(res.data);
  };

  const fetchSchedules = async () => {
    const res = await axios.get("http://localhost:5000/api/schedules");
    // Convert schedules from backend to FullCalendar format
    setEvents(
      res.data.map((s) => ({
        id: s._id,
        title: `${s.teacherId?.name} - ${s.title}`,
        start: s.start,
        end: s.end,
      }))
    );
  };

  const handleDateClick = (info) => {
    setStart(info.dateStr);
    setEnd(info.dateStr);
    setOpen(true);
  };

  const handleSave = async () => {
    const newEvent = { teacherId, title, start, end };
    await axios.post("http://localhost:5000/api/schedule", newEvent);
    setOpen(false);
    setTeacherId("");
    setTitle("");
    fetchSchedules();
  };

  const handleEventDrop = async (info) => {
    await axios.put(`http://localhost:5000/api/schedule/${info.event.id}`, {
      start: info.event.start,
      end: info.event.end,
    });
    fetchSchedules();
  };

  const handleEventResize = async (info) => {
    await axios.put(`http://localhost:5000/api/schedule/${info.event.id}`, {
      start: info.event.start,
      end: info.event.end,
    });
    fetchSchedules();
  };

  return (
    <div style={{ padding: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />

      {/* Popup Form */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Schedule</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            select
            label="Select Teacher"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            {teachers.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            type="datetime-local"
            label="Start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="datetime-local"
            label="End"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
