import React from "react";
import "./Home.css";
import Row from "../Row";
import RowSeries from "../RowSeries";
import requests from "../requests";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { withRouter } from "react-router-dom";

function App({ history }) {
  return (
    <div className="app">
      {/* nav bar*/}
      <Navbar history={history} />

      {/* banner*/}
      <Banner />

      <RowSeries
        tittle="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
        history={history}
      />
      <Row
        tittle="Trending Now"
        fetchUrl={requests.fetchTrending}
        history={history}
      />
      <Row
        tittle="Top Rated"
        fetchUrl={requests.fetchTopRated}
        history={history}
      />
      <Row
        tittle="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        history={history}
      />
      <Row
        tittle="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        history={history}
      />
      <Row
        tittle="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        history={history}
      />
      <Row
        tittle="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        history={history}
      />
      {/* <Row tittle="Documentaries" fetchUrl={requests.fetchDocumentaries} /> */}
    </div>
  );
}

export default withRouter(App);
