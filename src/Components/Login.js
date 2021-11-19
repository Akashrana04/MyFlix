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
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../firebase/base";
import { withRouter } from "react-router-dom";

import { red } from "@material-ui/core/colors";

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

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red,
  },
});
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

function SignIn({ history }) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    try {
      await firebase.login(email, password);
      alert("Login Done");
      history.replace("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Grid container layout={"row"}>
      <Grid item className={classes.section} xl={12}>
        <Container
          style={{
            backgroundColor: "black",
            borderRadius: "30px",
            borderColor: "red",
          }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="secondary">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => e.preventDefault() && false}
            >
              <TextField
                className={classes.textField}
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                autoFocus
              />
              <TextField
                className={classes.textField}
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox value="remember" color="secondary" checked />
                }
                style={{ color: "white" }}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={onLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="secondary">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" color="secondary">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Grid>
    </Grid>
    //    </div>
    // </div>
  );
}

export default withRouter(SignIn);
