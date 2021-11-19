import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFlag } from "react-icons/fa";
import "./Details.css";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    width: "100%",
    backgroundColor: "black",
    justifyContent: "centre",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    backgroundColor: "#ABACAB",
    opacity: 0.75,
    minWidth: 500,
    maxWidth: 1000,
  },
  paper2: {
    height: 140,
    width: 100,
  },
  image: {
    width: 400,
    height: 600,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function M() {
  const classes = useStyles();
  const [movie, setMovies] = useState([]);
  const [cast, setCast] = useState([]);
  let params = useParams();
  const apiURL =
    "https://api.themoviedb.org/3/movie/" +
    `${params.movieid}` +
    "?api_key=98325a9d3ed3ec225e41ccc4d360c817";
  const castURL = `https://api.themoviedb.org/3/movie/${params.movieid}/credits?api_key=98325a9d3ed3ec225e41ccc4d360c817`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(apiURL);
      setMovies(request.data);
      return request;
    }
    async function fetchData2() {
      const request2 = await axios.get(castURL);
      setCast(request2.data);
      return request2;
    }
    fetchData();
    fetchData2();
  }, [apiURL]);

  var path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  //  var profile_path = `https://image.tmdb.org/t/p/w500${cast.cast[0].profile_path}`;

  {
    console.log("Cast.cast " + cast.cast);
    console.log(cast);
    console.log(cast.cast);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={movie.title} src={path} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {movie.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {movie.overview}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {movie.release_date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Cast:
                  {cast !== null &&
                  cast !== undefined &&
                  cast.cast !== null &&
                  cast.cast !== undefined ? (
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        {
                          <div>
                            <Grid key={cast.cast[2]} item>
                              <Paper className={classes.paper2}>
                                <img
                                  style={{ width: "100px", height: "140px" }}
                                  src={`https://image.tmdb.org/t/p/w500${cast.cast[2].profile_path}`}
                                />
                              </Paper>
                            </Grid>
                            <Grid key={cast.cast[1]} item>
                              <Paper className={classes.paper2}>
                                <img
                                  style={{ width: "100px", height: "140px" }}
                                  src={`https://image.tmdb.org/t/p/w500${cast.cast[1].profile_path}`}
                                />
                              </Paper>
                            </Grid>
                            <Grid key={cast.cast[0]} item>
                              <Paper className={classes.paper2}>
                                <img
                                  style={{ width: "100px", height: "140px" }}
                                  src={`https://image.tmdb.org/t/p/w500${cast.cast[0].profile_path}`}
                                />
                              </Paper>
                            </Grid>
                          </div>
                        }
                      </Grid>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{movie.vote_average}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
