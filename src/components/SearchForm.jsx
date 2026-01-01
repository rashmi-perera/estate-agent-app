import { Box, TextField, MenuItem, Slider, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";

function SearchForm({ filters, onFilterChange, onSearch, onClear }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Property Type */}
        <TextField
          select
          label="Property Type"
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
        >
          <MenuItem value="Any">Any</MenuItem>
          <MenuItem value="House">House</MenuItem>
          <MenuItem value="Flat">Flat</MenuItem>
        </TextField>

        
      </Box>
    </LocalizationProvider>
  );
}

export default SearchForm;

