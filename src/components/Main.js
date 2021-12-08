import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Flashcard } from "./Flashcard";
import { Read } from "./Read";
import { Add } from "./Add";


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
          {users.length>0 &&<Add />}
            

            {users.length>0 & users[0]?.cards.length > 0 &&<Flashcard />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
