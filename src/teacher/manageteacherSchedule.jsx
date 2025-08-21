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
import rrulePlugin from "@fullcalendar/rrule";
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
import DailogBox from "../commonComponents/DailogBox";

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
  const [recurrence, setRecurrence] = useState({
    freq: "",
    interval: 1,
    byweekday: [],
    until: "",
    dtstart: "",
    bymonthday: "",
  });
  const [edit, setEdit] = useState(false);
  const [isRecurrence, setisRecurrence] = useState(false);
  const [editId, setEditId] = useState("");

  const formatDateTime = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
  };
  function rruleToDateTimeLocal(rruleDate) {
    if (!rruleDate) return "";
    const date = new Date(
      rruleDate.replace(
        /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
        "$1-$2-$3T$4:$5:$6Z"
      )
    );
    return date.toISOString().slice(0, 16);
  }

  const fetchSchedules = useCallback(async () => {
    const res = await dispatch(getAllteacherScheduleData()).unwrap();
    const mapped = (res?.allteacherSchedule || []).map((s) => {
      const teacherName = s?.teacherId?.name || "";
      const image = s?.teacherId?.image || "";
      const subject = s?.subject || "";
      const className = s?.className || "";
      const title = s?.title || "";
      if (s?.rrule) {
        const rruleParts = {};
        s.rrule.split(";").forEach((part) => {
          const [key, value] = part.split("=");
          rruleParts[key] = value;
        });

        const byweekday = rruleParts?.BYDAY ? rruleParts.BYDAY.split(",") : [];
        const freq = rruleParts?.FREQ?.toLowerCase() || "";
        const interval = parseInt(rruleParts?.INTERVAL) || 1;
        const until = rruleParts?.UNTIL || null;
        const dtstart = rruleParts?.DTSTART || s.start;
        const bymonthday = rruleParts?.BYMONTHDAY
          ? Number(rruleParts.BYMONTHDAY)
          : null;

        return {
          id: s._id,
          title: `${teacherName} ${title ? "· " + title : ""}`,
          rrule: {
            freq: freq?.toUpperCase(),
            interval,
            byweekday,
            dtstart,
            until,
            bymonthday,
          },
          extendedProps: {
            teacherId: s.teacherId?._id || "",
            teacherName,
            image,
            title,
            subject,
            className,
            recurrence: {
              freq: freq?.toUpperCase(),
              interval,
              byweekday,
              until,
              dtstart,
              bymonthday,
            },
          },
        };
      }
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
    setRecurrence({
      freq: "",
      interval: 1,
      byweekday: [],
      until: "",
      dtstart: "",
      bymonthday: "",
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
    const eventRecurrence =
      info.event.rrule || info.event.extendedProps.recurrence || {};
    console.log("Event recurrence for editing:", eventRecurrence);

    setRecurrence({
      freq: eventRecurrence.freq?.toLowerCase() || "",
      interval: eventRecurrence.interval || 1,
      byweekday: eventRecurrence.byweekday || eventRecurrence.byWeekDay || [],
      until: eventRecurrence.until
        ? rruleToDateTimeLocal(eventRecurrence.until)
        : "",
      dtstart: eventRecurrence.dtstart || "",
      bymonthday: eventRecurrence.bymonthday
        ? Number(eventRecurrence.bymonthday)
        : "",
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const buildRRule = (recurrence) => {
    if (!recurrence || !recurrence.freq) return "";

    const {
      freq,
      interval = 1,
      byweekday = [],
      bymonthday = "",
      until = "",
    } = recurrence;

    let rule = `FREQ=${freq?.toUpperCase()}`;

    if (interval > 1) rule += `;INTERVAL=${interval}`;

    if (byweekday.length > 0 && freq?.toUpperCase() === "WEEKLY") {
      rule += `;BYDAY=${byweekday
        .map((d) => d.trim().toUpperCase())
        .join(",")}`;
    }

    if (freq.toUpperCase() === "MONTHLY" && bymonthday) {
      rule += `;BYMONTHDAY=${bymonthday}`;
    }

    if (until) {
      if (/^\d{8}T\d{6}Z$/.test(until)) {
        rule += `;UNTIL=${until}`;
      } else {
        const untilDate = new Date(until);
        if (!isNaN(untilDate)) {
          const formatted =
            untilDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
          rule += `;UNTIL=${formatted}`;
        }
      }
    }

    console.log("Generated RRULE:", rule);
    return rule;
  };
  const handleSave = async () => {
    try {
      const payload = {
        teacherId: formData.teacherId,
        title: formData.title,
        subject: formData.subject,
        className: formData.className,
        start: new Date(formData.start).toISOString(),
        end: new Date(formData.end).toISOString(),
      };

      console.log("Saving with recurrence:", recurrence);

      if (isRecurrence) {
        const rrule = buildRRule(recurrence);
        console.log("Generated rrule:", rrule);

        if (rrule) {
          payload.rrule = rrule;
        }
      }

      console.log("Final payload:", payload);

      let res;
      if (edit) {
        res = await dispatch(
          updateScheduleData({ id: editId, values: payload })
        ).unwrap();
      } else {
        res = await dispatch(setScheduleData(payload)).unwrap();
      }

      toast.success(res.msg);
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
    setRecurrence({
      freq: "",
      interval: 1,
      byweekday: [],
      until: "",
      dtstart: "",
      bymonthday: "",
    });
    setEditId("");
    setEdit(false);
  };
  const buildSchedulePayload = (event) => {
    const finalRecurrence = event.extendedProps.recurrence || {};
    const rrule = buildRRule(finalRecurrence);

    return {
      id: event.id,
      teacherId: event.extendedProps.teacherId,
      title: event.extendedProps.title,
      subject: event.extendedProps.subject,
      className: event.extendedProps.className,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      rrule,
    };
  };
  const handleEventDrop = async (info) => {
    const event = info.event;
    console.log("Event being dropped:", event);

    const payload = buildSchedulePayload(event);
    console.log("Drop Payload:", payload);

    await dispatch(
      updateScheduleData({ id: event.id, values: payload })
    ).unwrap();
    fetchSchedules();
  };
  /*********************************Event Resize Function*********************************** */
  const handleEventResize = async (info) => {
    const event = info.event;
    console.log("Event being resized:", event);

    const payload = buildSchedulePayload(event);
    console.log("Resize Payload:", payload);

    await dispatch(
      updateScheduleData({ id: event.id, values: payload })
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
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
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
      <DailogBox
        onClose={handleClose}
        open={open}
        selectedTeacher={user}
        edit={edit}
        formData={formData}
        onChange={handleChange}
        event={events}
        recurrence={recurrence}
        setRecurrence={setRecurrence}
        setisRecurrence={setisRecurrence}
        onClick1={handleClose}
        onClick2={handleDelete}
        onClick3={handleSave}
      />
    </div>
  );
}
