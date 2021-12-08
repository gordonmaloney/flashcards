import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, updatePost } from "../actions/posts";
import { CARDS } from "./CARDS";
import { useEffect } from "react";

export const Add = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.posts);
  const user = users[0];

  const [updateData, setUpdateData] = useState(user);

  useEffect(() => {
    setUpdateData(user)
  }, user.cards)

  const [newCard, setNewCard] = useState();

  const handleUpdate = (id, updatedPost) => {
    dispatch(updatePost(id, updatedPost));
  };

  console.log("user: ", user);
  console.log("updateData: ", updateData);

  let userCards = [];
  user.cards.map((usercard) => userCards.push(parseInt(usercard.id)));

  if (
    newCard &&
    CARDS.filter((card) => card.id == newCard).length > 0 &&
    updateData.cards.filter((card) => card.id == newCard).length == 0
  ) {
    updateData.cards.push({
      id: newCard,
      date: new Date().valueOf(),
      delay: 0,
      reviews: 0,
    });
  }

  console.log("cards: ", user.cards);

  return (
    <div>
      <input onChange={(e) => setNewCard(e.target.value)} />  
      <button onClick={() => handleUpdate(user._id, updateData)}>Update</button>
    </div>
  );
};
