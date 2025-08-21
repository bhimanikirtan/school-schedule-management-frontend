import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

function ListingTable({ title, headers, data }) {
  return (
    <Box mt={5}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      {data?.length === 0 ? (
        <Typography>No records found.</Typography>
      ) : (
        <Paper elevation={2} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f4eee5" }}>
              <TableRow>
                {headers.map((col, index) => (
                  <TableCell
                    key={index}
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={row._id || rowIndex}>
                  {headers.map((h, colIndex) => (
                    <TableCell key={colIndex}>{row[h.field]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}

export default ListingTable;
