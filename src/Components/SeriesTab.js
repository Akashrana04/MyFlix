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
    height: "100%",
    width: "100%",
  },
  search: {
    marginTop: 70,
  },
  navbar: {
    backgroundColor: "black",
  },
  // expand: {
  //   transform: "rotate(0deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)",
  // },
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));

function App({ history }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [userMovie, setUserMovie] = useState([]);
  const [fav, setfav] = useState(false);
  const classes = useStyles();
  //const fetchUrl = `https://api.themoviedb.org/3/search/tv?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=${search}`;
  const toSearch = async (search) => {
    const fetchUrl = `https://api.themoviedb.org/3/search/tv?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=${search}`;
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };

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
    fetchdata();
  });

  return (
    <div style={{ backgroundColor: "black" }}>
      <Grid className={classes.navbar}>
        <Navbar history={history} />
      </Grid>
      <Container className={classes.root2}>
        <Grid lg={10}>
          <SearchBar
            className={classes.search}
            value={search}
            onChange={(newValue) => setSearch(newValue)}
            onRequestSearch={() => toSearch(search)}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="left" spacing={3}>
            {// [0, 1, 2].map((value) => (
            //   <Grid key={value} item>
            //     <Paper className={classes.paper} />
            //   </Grid>
            // ))
            movies.map((movie) => (
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
                          firebase.addSeries(
                            firebase.getCurrentUsername(),
                            movie
                          );
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
            ))}
          </Grid>
        </Grid>

        {console.log(movies)}
      </Container>
    </div>
  );
}

export default withRouter(App);
