import React, { useState } from "react";
import { CARDS } from "./CARDS";

export const Flashcard = () => {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(false);

  const handlePrev = () => {
    if (index == 0) {
      setIndex(CARDS.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index == CARDS.length - 1) {
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
          {CARDS[index].en}
          <br />
          {answer ? (
            <>
              {CARDS[index].gd}
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
              CARDS[index].date = new Date();;
              CARDS[index].delay = 0;
              handleNext();
            }}
          >
            Wrong
          </button>
          <button
            onClick={() => {
              CARDS[index].date.setDate(CARDS[index].date.getDate() + (CARDS[index].delay + 1)*2);
              CARDS[index].delay = (CARDS[index].delay + 1)*2;
              handleNext();
            }}
          >
            Correct
          </button>
          <button
            onClick={() => {
              CARDS[index].date.setDate(CARDS[index].date.getDate() + (CARDS[index].delay + 1)*3);
              CARDS[index].delay = (CARDS[index].delay + 1)*3;
              handleNext();
            }}
          >
            Easy
          </button>
        </center>
      </div>

      {CARDS.map((card) => (
        <>
          {card.gd} - {card.en} - {card.date.toLocaleDateString()} -{" "}
          {card.delay}
          <br />
        </>
      ))}

<br />
Due today:
<br />
{CARDS.filter(card => card.date <= new Date()).map((card) => (
        <>
          {card.gd} - {card.en} - {card.date.toLocaleDateString()} -{" "}
          {card.delay}
          <br />
        </>
      ))}

    </>
  );
};
