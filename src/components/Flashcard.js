import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts, updateComment } from "../actions/posts";
import { CARDS } from "./CARDS";

export const Flashcard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const users = useSelector((state) => state.posts);
  const user = users[0];

  const handleUpdate = (id, commentId, updatedPost) => {
    console.log("handling...", id, commentId, updatedPost)
    dispatch(updateComment(id, commentId, updatedPost));
  };

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(false);

  if (users.length > 0) {
    //make list of all IDs of user's cards
    let userCards = [];
    user.cards.map((usercard) => userCards.push(parseInt(usercard.id)));

    //set CARD variable to first of an index of cards where ID is in userCards
    let CARD = CARDS.filter((card) => 
      userCards.includes(card.id)    
    )[index];

    //identify card in user's cards array
    let USERCARD = user.cards.filter((card) => card.id == CARD.id)[0];
    console.log(new Date(parseInt(USERCARD.date)))
    console.log(USERCARD)

    const handlePrev = () => {
      if (index == 0) {
        setIndex(
          CARDS.filter((card) => userCards.includes(card.id)).length - 1
        );
      } else {
        setIndex(index - 1);
      }
    };

    const handleNext = () => {
      if (
        index ==
        CARDS.filter((card) => userCards.includes(card.id)).length - 1
      ) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    };

    return (
      <>
        <div
          style={{
            backgroundColor: "beige",
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "25px",
            marginTop: "100px",
            border: "1px solid black",
            borderRadius: "20px",
          }}
        >
          <center>
            {CARD.en}
            <br />
            {answer ? (
              <>
                {CARD.gd}
                <br />
                <br />
              </>
            ) : (
              <>
                <br />
                <br />
              </>
            )}
            <button onClick={() => setAnswer(!answer)}>Show Answer</button>
            <br />
            <button
              onClick={() => {
                setAnswer(false);
                handlePrev();
              }}
            >
              Prev
            </button>
            <button
              onClick={() => {
                setAnswer(false);
                handleNext();
              }}
            >
              Next
            </button>

            <br />

            <button
              onClick={() => {
                USERCARD.date = new Date().valueOf()
                USERCARD.delay = 0;
                USERCARD.reviews++;

                handleUpdate(user._id, USERCARD.id, USERCARD);
                handleNext();
              }}
            >
              Wrong
            </button>
            <button
              onClick={() => {
                USERCARD.date = (new Date()).setDate((new Date()).getDate() + (parseInt(USERCARD.delay) + 1) * 2)
                USERCARD.delay = (parseInt(USERCARD.delay) + 1) * 2;
                USERCARD.reviews++;
                //USERCARD.date = new Date().valueOf()
                //USERCARD.delay = 0
                //USERCARD.reviews = 0
                
                handleUpdate(user._id, USERCARD.id, USERCARD);
                handleNext();
              }}
            >
              Correct
            </button>
            <button
              onClick={() => {
                USERCARD.date = (new Date()).setDate((new Date()).getDate() + (parseInt(USERCARD.delay) + 1) * 3)
                USERCARD.delay = (parseInt(USERCARD.delay) + 1) * 3;
                USERCARD.reviews++;
                handleUpdate(user._id, USERCARD.id, USERCARD);
                handleNext();
              }}
            >
              Easy
            </button>
          </center>
        </div>

        <center>
          <h1>Stats</h1>

          <table>
            <tr>
              <th>Gaelic</th>
              <th>English</th>
              <th>Due</th>
              <th>Delay</th>
              <th>Reviews</th>
            </tr>
            <span className="tableHr">All words:</span>
            <br />
            {user.cards.map((card) => (
              <tr>
                <td>
                  {CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].gd}
                </td>
                <td>
                  {CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].en}
                </td>
                <td>{new Date(card.date).toLocaleDateString()}</td>
                <td>{card.delay}</td>
                <td>{card.reviews}</td>
              </tr>
            ))}
            <br />
            <span className="tableHr">Due today:</span>
            <br />
            {user.cards
              .filter((card) => card.date <= new Date())
              .map((card) => (
                <tr>
                  <td>
                    {CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].gd}
                  </td>
                  <td>
                    {CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].en}
                  </td>
                  <td>{new Date(card.date).toLocaleDateString()}</td>
                  <td>{card.delay}</td>
                  <td>{card.reviews}</td>
                </tr>
              ))}
          </table>
        </center>
      </>
    );
  } else {
    return <>Loading...</>;
  }
};
