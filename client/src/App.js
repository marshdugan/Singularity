import React, { Component, useState, useEffect } from "react";
import Nav from './components/Nav'
import Footer from './components/Footer'
import Library from './components/Library'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import User from "./pages/User";
import DeckBuilder from "./pages/DeckBuilder"
import GamePlay from "./pages/GamePlay"
import Landing from "./pages/Landing"
import axios from "axios";
import Rules from './pages/Rules'

function App() {

  const [user, setUser] = useState({ user: null });

  useEffect(() => {
    axios.get("/api/checkUser").then(response => {
      if (response.data) {
        setUser(response.data._id)
      }
    })
  })

  return (
    <>
      <Router>
        <Nav user={user} />
        <Route exact path="/" component={() => <Landing user={user} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/gameplay" component={() => user.user !== null ? <GamePlay userName={user} /> : <Login />} />
        <Route path="/user" component={() => user.user !== null ? <User user={user} /> : <Login />} />
        <Route path="/cards" component={Library} />
        <Route path="/deckbuilder" component={() => user.user !== null ? <DeckBuilder userID={user} /> : <Login />} />
        <Route path='/rules' component={Rules}/>
        <Footer />
      </Router>
    </>
  );
}

export default App;
