import React, { useState } from "react";
import { CARDS } from "./CARDS";
import { USERS } from "./USERS";

export const Flashcard = () => {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(false);

  let userCards = [];
  USERS[0].cards.map((usercard) => userCards.push(usercard.id));

  let CARD = CARDS.filter((card) => userCards.includes(card.id))[index];
  let USERCARD = USERS[0].cards.filter((card) => card.id == CARD.id)[0];

  console.log(CARD, USERCARD);

  const handlePrev = () => {
    if (index == 0) {
      setIndex(CARDS.filter((card) => userCards.includes(card.id)).length - 1);
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
              USERCARD.date = new Date();
              USERCARD.delay = 0;
              USERCARD.reviews++;
              handleNext();
            }}
          >
            Wrong
          </button>
          <button
            onClick={() => {
              USERCARD.date.setDate(
                USERCARD.date.getDate() + (USERCARD.delay + 1) * 2
              );
              USERCARD.delay = (USERCARD.delay + 1) * 2;
              USERCARD.reviews++;
              handleNext();
            }}
          >
            Correct
          </button>
          <button
            onClick={() => {
              USERCARD.date.setDate(
                USERCARD.date.getDate() + (USERCARD.delay + 1) * 3
              );
              USERCARD.delay = (USERCARD.delay + 1) * 3;
              USERCARD.reviews++;
              handleNext();
            }}
          >
            Easy
          </button>
        </center>
      </div>

      <h1>Stats</h1>

      <table>
        <tr>
          <th>Gaelic</th>
          <th>English</th>
          <th>Due</th>
          <th>Delay</th>
          <th>Reviews</th>
        </tr>
        All words:
        <br />
        {USERS[0].cards.map((card) => (
          <tr>
            <td>{CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].gd}</td>
            <td>{CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].en}</td>
            <td>{card.date.toLocaleDateString()}</td>
            <td>{card.delay}</td>
            <td>{card.reviews}</td>
          </tr>
        ))}
        <br />
        Due today:
        <br />
        {USERS[0].cards
          .filter((card) => card.date <= new Date())
          .map((card) => (
            <tr>
              <td>
                {CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].gd}
              </td>
              <td>
                {CARDS.filter((cardDeck) => cardDeck.id == card.id)[0].en}
              </td>
              <td>{card.date.toLocaleDateString()}</td>
              <td>{card.delay}</td>
              <td>{card.reviews}</td>
            </tr>
          ))}
      </table>
    </>
  );
};
