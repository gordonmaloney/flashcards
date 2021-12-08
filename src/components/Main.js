import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Flashcard } from "./Flashcard";
import { Read } from "./Read";


export const Main = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const users = useSelector((state) => state.posts);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Read />

            {users.length>0 &&<Flashcard />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
