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

        {/* Price Slider */}
        <Box>
          <Typography gutterBottom>
            Price Range: £{filters.minPrice.toLocaleString()} - £{filters.maxPrice.toLocaleString()}
          </Typography>

          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={1500000}
            step={50000}
            valueLabelDisplay="auto"
            onChange={(e, newValue) => {
              onFilterChange("minPrice", newValue[0]);
              onFilterChange("maxPrice", newValue[1]);
            }}
          />
        </Box>
        {/* Bedrooms */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            fullWidth
            label="Min Bedrooms"
            value={filters.minBeds}
            onChange={(e) => onFilterChange("minBeds", e.target.value)}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5+</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Max Bedrooms"
            value={filters.maxBeds}
            onChange={(e) => onFilterChange("maxBeds", e.target.value)}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5+</MenuItem>
          </TextField>
        </Box>



        
      </Box>
    </LocalizationProvider>
  );
}

export default SearchForm;

