import { Box, TextField, MenuItem, Slider, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchForm.css";

/* PRICE FILTER CONSTANTS*/
const PRICE_MIN = 0;
const PRICE_MAX = 1500000;
const PRICE_STEP = 50000;



function SearchForm({ filters, onFilterChange, onSearch, onClear }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="search-form-container">
        
        {/* Property Type */}
        <div className="form-field-wrapper">
          <TextField

            select
            label="Property Type"
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Flat">Flat</MenuItem>
          </TextField>
        </div> 

        {/* Price Slider */}
        <div className="form-field-wrapper">
          <Typography gutterBottom className="slider-label">
            Price Range: £{filters.minPrice.toLocaleString()} - £{filters.maxPrice.toLocaleString()}
          </Typography>

          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            valueLabelDisplay="auto"
            onChange={(e, newValue) => {
              onFilterChange("minPrice", newValue[0]);
              onFilterChange("maxPrice", newValue[1]);
            }}
            sx={{mt:1}}
          />
        </div>
        
        {/* Bedrooms */}
        <div className="form-row-two-columns">
          <div className="form-field-wrapper">

            <TextField
              select
              fullWidth
              label="Min Bedrooms"
              value={filters.minBeds}
              onChange={(e) => onFilterChange("minBeds", e.target.value)}
              size="small"
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5+</MenuItem>
            </TextField>
          </div>

          <div className="form-field-wrapper">

            <TextField
              select
              fullWidth
              label="Max Bedrooms"
              value={filters.maxBeds}
              onChange={(e) => onFilterChange("maxBeds", e.target.value)}
              size="small"
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5+</MenuItem>
            </TextField>
          </div>
        </div>
        {/* Date Added */}
        <div className="form-row-two-columns">
          <div className="form-field-wrapper">
            <DatePicker
              label="Added After"
              value={filters.dateFrom}
              onChange={(val) => onFilterChange("dateFrom", val)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small"
                }
              }}
            />
        </div>
        <div className="form-field-wrapper">
          <DatePicker
            label="Added Before"
            value={filters.dateTo}
            onChange={(val) => onFilterChange("dateTo", val)}
             slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small"
                }
              }}
            />
          </div>
        </div>
          
        

        {/* Postcode */}
         <div className="form-field-wrapper">
           <TextField
             select
             label="Postcode Area"
             value={filters.postcode}
             onChange={(e) => onFilterChange("postcode", e.target.value)}
             fullWidth
             size="small"
           >
             <MenuItem value="">Any</MenuItem>
             <MenuItem value="BR1">BR1</MenuItem>
             <MenuItem value="BR2">BR2</MenuItem>
             <MenuItem value="BR3">BR3</MenuItem>
             <MenuItem value="BR4">BR4</MenuItem>
             <MenuItem value="BR5">BR5</MenuItem>
             <MenuItem value="BR6">BR6</MenuItem>
             <MenuItem value="KT3">KT3</MenuItem>
           </TextField>
         </div>

        {/* BUTTONS */}
        <div className="form-actions-row">
          <Button 
            variant="contained"
            onClick={onSearch}
            fullWidth
            size="large"
            startIcon={<SearchIcon />}
            className="search-button"
            sx={{ 
              backgroundColor: "#10abd6",
              '&:hover': { backgroundColor: "#0d8fb5" },
              fontSize: { xs: '14px', sm: '16px' } // Smaller text on mobile
            }}
          >
            Search
          </Button>
          <Button 
            variant="outlined"
            onClick={onClear}
            fullWidth
            size="large"
            startIcon={<ClearIcon />}
            color="error"
            className="clear-button"
           
           
           >
            Clear
          </Button>
        </div>








        
      </div>
    </LocalizationProvider>
  );
}

export default SearchForm;

