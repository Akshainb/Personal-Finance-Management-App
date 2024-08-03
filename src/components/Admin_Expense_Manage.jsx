import {
  Box,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin_Expense_Manage = () => {
  const [UserExp, setUserExp] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function isoStringToDate(isoString) {
    const [datePart] = isoString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/pfm/admin/expense", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setUserExp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const delValue = (id) => {
    axios
      .delete("http://localhost:3000/pfm/admin/expense/delete/" + id, {
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

  const filteredUserExp = UserExp.filter((val) =>
    val.userId.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        mt: { sm: "11%", md: "6%" },
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <TextField
            label="Search by Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TableContainer sx={{ maxHeight: 607, minWidth: 900 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUserExp.map((val) => (
                  <TableRow key={val._id}>
                    <TableCell>{val.userId.email}</TableCell>
                    <TableCell>{val.amount}</TableCell>
                    <TableCell>{isoStringToDate(val.date)}</TableCell>
                    <TableCell>{val.description}</TableCell>
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

export default Admin_Expense_Manage;
