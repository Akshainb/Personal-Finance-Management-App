import {
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

var email;
const Add = () => {
  var navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode");
  const id = params.get("id");
  let date = new Date(); //for update, first take date using useEffect, then add condition
  const [value, setValue] = useState(dayjs(date));

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [finance, setFinance] = useState([]);
  useEffect(() => {
    if (mode === "update" && id) {
      // Fetch data for the specific id and populate the form
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/pfm/money/view`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const data = response.data.finance;
          setFinance(response.data.finance);
          setAmount(data[0].amount);
          // setCategory(data[0].category);
          setDescription(data[0].description);
          // setValue(dayjs(data.date));
        } catch (error) {
          console.error("Failed to fetch data for update:", error);
        }
      };

      fetchData();
    }
  }, [mode, id]);
  const addHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/pfm/money/add",
        {
          amount,
          category,
          description,
          date: value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        navigate("/userdash");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateHandler = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/pfm/money/update",
        {
          amount,
          category,
          description,
          date: value,
          id: finance[0]._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        navigate("/userdash");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ mt: { xs: "15%", sm: "10%", md: "8%", lg: "5%" } }}
    >
      <Grid item xs={11} sm={8} md={6} lg={4} sx={{ marginTop: "2%" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontFamily: "times", mb: 3 }}>
            Add New Income/Expense
          </Typography>
          <Box sx={{ mb: 3 }}>
            <TextField
              style={{ width: "32ch" }}
              variant="outlined"
              label="Amount"
              fullWidth
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              name="Amount"
              value={amount}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControl style={{ width: "32ch" }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Category"
                name="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value="Expense">Expense</MenuItem>
                <MenuItem value="Income">Income</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 3 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DatePicker
                label="Select Date"
                name="Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              style={{ width: "32ch" }}
              variant="outlined"
              label="Description"
              fullWidth
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              name="Description"
              value={description}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={mode == "update" ? updateHandler : addHandler}
            sx={{
              backgroundColor: "#183e4b",
              fontFamily: "times",
              borderRadius: "2rem",
            }}
          >
            {mode == "update" ? "Update" : "Confirm"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Add;
