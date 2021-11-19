import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Components/Home";
// import Volunteer from "./Components/Volunteer";
import Login from "./Components/Login";
import MovieTab from "./Components/MovieTab";
import SeriesTab from "./Components/SeriesTab";

// import List from "./Components/List";
// import HelpedList from "./Components/HelpedList";
// import Profile from "./Components/Profile";
// import Locate from "./Components/Locate";
// import NotFound from "./Components/NotFound";
// import Nearme from "./Components/Nearme";
import "./App.css";
import SignUp from "./Components/SignUp";
import firebase from "./firebase/base";
import MovieDetail from "./Components/MovieDetail";
import SeriesDetail from "./Components/SeriesDetail";
import Mylist from "./Components/Mylist";

function App() {
  useEffect(() => {
    firebase.isInitialized();
  });
  return (
    // <div className="app">
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/moviedetail/:movieid">
          <MovieDetail />
        </Route>
        <Route path="/seriesdetail/:seriesid">
          <SeriesDetail />
        </Route>
        <Route path="/movietab">
          <MovieTab />
        </Route>

        <Route path="/seriestab">
          <SeriesTab />
        </Route>

        <Route path="/mylist">
          <Mylist />
        </Route>

        {/* 

        

        

        <Route path="/helpedlist">
          <HelpedList />
        </Route>

        <Route path="*">
          <NotFound />
        </Route> */}
      </Switch>
    </BrowserRouter>
    // {/* </div> */}
  );
}

export default App;
