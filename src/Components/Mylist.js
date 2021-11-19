import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import "./Details.css";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Navbar from "./NavbarSearch";
import { withRouter } from "react-router-dom";
import firebase from "../firebase/base";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    minWidth: 356,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  root2: {
    backgroundColor: "black",
  },
  search: {
    marginTop: 70,
  },
  navbar: {
    backgroundColor: "black",
  },
}));

function App({ history }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState("");
  const [userMovie, setUserMovie] = useState([]);
  const [userSeries, setUserSeries] = useState([]);
  const [fav, setfav] = useState(false);
  const classes = useStyles();
  //const fetchUrl = `https://api.themoviedb.org/3/search/tv?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=${search}`;
  //   const toSearch = async (search) => {
  //     const fetchUrl =
  //       "https://api.themoviedb.org/3/movie/" +
  //       `${search}` +
  //       "?api_key=98325a9d3ed3ec225e41ccc4d360c817";
  //     const request = await axios.get(fetchUrl);
  //     setUserMovie(request.data.results);
  //     toDisplay();
  //     return request;
  //   };

  function toDisplay(movie) {
    return (
      <Grid key={movie.id} item>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.original_title}
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                onClick={() => {
                  firebase.addMovie(firebase.getCurrentUsername(), movie.id);
                }}
                color="secondary"
              />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon
                onClick={() => {
                  history.push(`/moviedetail/${movie.id}`);
                }}
              />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  function toDisplayseries(movie) {
    return (
      <Grid key={movie.id} item>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.name}
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                onClick={() => {
                  firebase.addMovie(firebase.getCurrentUsername(), movie.id);
                }}
                color="secondary"
              />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon
                onClick={() => {
                  history.push(`/seriesdetail/${movie.id}`);
                }}
              />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  useEffect(() => {
    const fetchdata = async () => {
      await firebase.db
        .collection("users")
        .where("emailId", "==", `${firebase.getCurrentUsername()}`)
        .get()
        .then((querySnapshot) => {
          setUserMovie(querySnapshot.docs.map((doc) => doc.data()));
        });
    };
    const fetchdata2 = async () => {
      await firebase.db
        .collection("userseries")
        .where("emailId", "==", `${firebase.getCurrentUsername()}`)
        .get()
        .then((querySnapshot) => {
          setUserSeries(querySnapshot.docs.map((doc) => doc.data()));
        });
    };
    fetchdata();
    fetchdata2();
  }, [firebase.getCurrentUsername()]);

  return (
    <div style={{ backgroundColor: "black" }}>
      <Grid className={classes.navbar}>
        <Navbar history={history} />
      </Grid>
      <br />
      <br />
      <br />
      <br />
      {userMovie !== null && userMovie !== undefined ? (
        <Container className={classes.root2}>
          <Grid item xs={12}>
            <Grid container justify="left" spacing={3}>
              {console.log(userMovie)}
              {userMovie.map((movie) => toDisplay(movie.movie))}
            </Grid>
          </Grid>
        </Container>
      ) : (
        <div></div>
      )}
      <br />
      <br />
      {userSeries !== null && userSeries !== undefined ? (
        <Container className={classes.root2}>
          <Grid item xs={12}>
            <Grid container justify="left" spacing={3}>
              {console.log(userSeries)}
              {userSeries.map((movie) => toDisplayseries(movie.series))}
            </Grid>
          </Grid>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default withRouter(App);
