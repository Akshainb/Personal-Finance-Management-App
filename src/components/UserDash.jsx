import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
var email;
const UserDash = () => {
  const navigate = useNavigate();
  function isoStringToDate(isoString) {
    // Split the ISO string into date and time parts
    const [datePart] = isoString.split("T");

    // Split the date part into year, month, and day
    const [year, month, day] = datePart.split("-");

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }
  const [finance, setFinance] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/pfm/money/view", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFinance(res.data.finance);
      });
  }, []);

  const delValue = (id) => {
    axios
      .delete("http://localhost:3000/pfm/money/delete/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        mt: { sm: "11%", md: "6%" },
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <TableContainer sx={{ maxHeight: 607, minWidth: 900 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Button variant="contained" color="success" size="large">
                      <Link
                        to="/add"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Add
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {finance.map((val) => (
                  <TableRow key={val._id}>
                    <TableCell>{val.amount}</TableCell>
                    <TableCell>{val.category}</TableCell>
                    <TableCell>{isoStringToDate(val.date)}</TableCell>
                    <TableCell>{val.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate("/add?mode=update&id=" + val._id)
                        }
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => delValue(val._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDash;
