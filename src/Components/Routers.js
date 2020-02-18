import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Main from "../Pages/Main";
import Board from "../Pages/Board";
import Write from "../Pages/Write";
import TagChoice from "../Pages/TagChoice";
import Agree from "../Pages/Agree";
import Message from "../Pages/Message";

function Routers({ location }) {
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300 }}
        classNames="fade"
      >
        <section className="route-section">
          <Switch location={location}>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/main" component={Main} />
            <Route path="/board" component={Board} />
            <Route path="/write" component={Write} />
            <Route path="/tagchoice" component={TagChoice} />
            <Route path="/agree/:index" component={Agree} />
            <Route path="/message" component={Message} />
            <Route component={Login} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Routers);
