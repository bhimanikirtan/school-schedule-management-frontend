import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import ButtonComponent from "./ButtonComponent";
function DailogBox({
  onClose,
  open,
  selectedTeacher,
  edit,
  event,
  formData,
  onChange,
  allTeachers,
  allSubjects,
  recurrence,
  setRecurrence,
  setisRecurrence,
  onClick1,
  onClick2,
  onClick3,
}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
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
                  ? `http://192.168.146.1:5000/${selectedTeacher.image}`
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
            onChange={onChange}
            fullWidth
            size="small"
          >
            {event ? (
              <MenuItem value={formData.teacherId}>
                {event.find(
                  (e) => e.extendedProps.teacherId === formData.teacherId
                )?.extendedProps.teacherName || ""}
              </MenuItem>
            ) : (
              allTeachers.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            label="Title (e.g., Dance Class)"
            name="title"
            value={formData.title}
            onChange={onChange}
            fullWidth
            size="small"
          />
          {event ? (
            <TextField
              label="Select Subject"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              fullWidth
              disabled
              size="small"
            />
          ) : (
            <TextField
              select
              label="Select Subject"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              fullWidth
              size="small"
            >
              {allSubjects.map((s) => (
                <MenuItem key={s._id} value={s.subject}>
                  {s.subject}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="Class Name (e.g., 7A, 7B)"
            name="className"
            value={formData.className}
            onChange={onChange}
            fullWidth
            size="small"
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              type="datetime-local"
              label="Start Time"
              name="start"
              value={formData.start}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
            <TextField
              type="datetime-local"
              label="End Time"
              name="end"
              value={formData.end}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Box>
          <Divider />

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Recurrence (Optional)
          </Typography>

          <TextField
            select
            label="Repeat"
            value={recurrence?.freq}
            onChange={(e) => {
              setRecurrence((prev) => ({ ...prev, freq: e.target.value }));
              setisRecurrence(true);
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </TextField>

          {recurrence?.freq && (
            <>
              <TextField
                type="number"
                label="Repeat Every (interval)"
                value={recurrence?.interval}
                onChange={(e) =>
                  setRecurrence((prev) => ({
                    ...prev,
                    interval: Number(e.target.value),
                  }))
                }
                fullWidth
                size="small"
              />

              {recurrence?.freq === "weekly" && (
                <Box display="flex" gap={1} flexWrap="wrap">
                  {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
                    <Button
                      key={day}
                      variant={
                        recurrence?.byweekday.includes(day)
                          ? "contained"
                          : "outlined"
                      }
                      size="small"
                      onClick={() =>
                        setRecurrence((prev) => ({
                          ...prev,
                          byweekday: prev.byweekday.includes(day)
                            ? prev.byweekday.filter((d) => d !== day)
                            : [...prev.byweekday, day],
                        }))
                      }
                    >
                      {day}
                    </Button>
                  ))}
                </Box>
              )}
              {recurrence?.freq === "monthly" && (
                <TextField
                  type="number"
                  label="Day of Month"
                  value={recurrence.bymonthday}
                  onChange={(e) =>
                    setRecurrence((prev) => ({
                      ...prev,
                      bymonthday: Number(e.target.value),
                    }))
                  }
                  inputProps={{ min: 1, max: 31 }}
                  fullWidth
                  size="small"
                />
              )}

              <TextField
                type="datetime-local"
                label="Until"
                value={recurrence.until}
                onChange={(e) =>
                  setRecurrence((prev) => ({ ...prev, until: e.target.value }))
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <ButtonComponent
            onClick={onClick1}
            variant="outlined"
            buttonText="Cancel"
            sx={{ border: "1px solid black", color: "black" }}
          />

          {edit && (
            <ButtonComponent
              onClick={onClick2}
              variant="outlined"
              buttonText="Delete"
              sx={{ border: "1px solid red", color: "red" }}
            />
          )}
          <ButtonComponent
            onClick={onClick3}
            buttonText={edit ? "Update" : "Save"}
            sx={{ bgcolor: "primary.main", color: "#fff" }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DailogBox;
