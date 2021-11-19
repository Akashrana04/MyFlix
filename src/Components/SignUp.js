import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./SignUp.css";
import firebase from "../firebase/base";
import { withRouter } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        The Silver Screen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: "#404040",
    borderRadius: "10px",
    // fontSize: "50px",
  },
  section: {
    height: "100%",
    backgroundColor: "black",
    //backgroundImage: "../Components/landingpage.jpg",
    width: "100%",
    marginBottom: "0px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    // backgroundImage:
    //   "https://raw.githubusercontent.com/Azazel5/NetflixClone/master/src/assets/images/landingPage.jpg",
    backgroundColor: "black",
    borderColor: "red",
    borderRadius: "30px",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "red",
  },
}));

function SignUp({ history }) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onRegister = async () => {
    try {
      await firebase.register(name, email, password);
      alert("SignUp Done");
      history.replace("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    // <div className="app">
    <Grid container layout={"row"}>
      <Grid item className={classes.section} xl={12}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="secondary">
              Sign up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => e.preventDefault() && false}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    className={classes.textField}
                    color="secondary"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    color="secondary"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    color="secondary"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    color="secondary"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="secondary"
                        checked
                      />
                    }
                    style={{ color: "white" }}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={onRegister}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" color="secondary">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
        <br />
        <br />
        <br />
        <br />
      </Grid>
    </Grid>
  );
}

export default withRouter(SignUp);
