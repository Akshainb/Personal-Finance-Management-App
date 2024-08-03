import {
  Paper,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alertf, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertState, setAlertState] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginMode, setLoginMode] = useState("user");
  // const handleLoginModeChange = (event, newMode) => {
  //   if (newMode !== null) {
  //     setLoginMode(newMode);
  //   }
  // };
  const loginHandler = async () => {
    const response = await axios.post("http://localhost:3000/pfm/user/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    navigate(email === "nistel@gmail.com" ? "/admin_dash" : "/userdash");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", padding: isSmallScreen ? "1rem" : "2rem" }}
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={6}
        xl={4}
        style={{ textAlign: "center" }}
      >
        <Paper
          sx={{ backgroundColor: "#dcdcdc", padding: "2rem" }}
          elevation={15}
        >
          <Collapse in={alertState}>
            {alertf && (
              <Alert
                action={
                  <IconButton onClick={() => setAlertState(false)}>
                    <CloseIcon />
                  </IconButton>
                }
                severity="error"
              >
                {alertContent}
              </Alert>
            )}
          </Collapse>
          <Typography
            variant={isSmallScreen ? "h4" : "h3"}
            style={{ fontFamily: "times", paddingTop: "1rem" }}
          >
            Login
          </Typography>
          {/* <ToggleButtonGroup
            value={loginMode}
            exclusive
            onChange={handleLoginModeChange}
            aria-label="login mode"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="user" aria-label="user">
              User
            </ToggleButton>
            <ToggleButton value="admin" aria-label="admin">
              Admin
            </ToggleButton>
          </ToggleButtonGroup> */}
          <TextField
            variant="outlined"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="Email"
            fullWidth
            sx={{ m: 2 }}
          />
          <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={loginHandler}
            style={{
              backgroundColor: "#183e4b",
              fontFamily: "times",
              borderRadius: "2rem",
              marginBottom: "1rem",
              width: "30%",
              padding: "0.75rem",
              fontSize: "1rem",
            }}
          >
            Log In
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
