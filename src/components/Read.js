import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

export const Read = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, []);
  
    const users = useSelector((state) => state.posts);
  
    return (
      <div>
          {users.length > 0 && <>Welcome, {users[0].name}! You have {users[0].cards.length} cards.</>}
      </div>
    );
  };
  