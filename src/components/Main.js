import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Flashcard } from "./Flashcard";

export const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Flashcard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
