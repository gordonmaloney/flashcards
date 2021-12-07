import React, { useState } from "react";
import { CARDS } from "./CARDS";

export const Flashcard = () => {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(false);


  const handlePrev = () => {
      if (index == 0) {
         setIndex(CARDS.length-1)
      } else {
          setIndex(index-1)
      }
  }

  const handleNext = () => {
    if (index == CARDS.length-1) {
       setIndex(0)
    } else {
        setIndex(index+1)
    }
}

  return (
    <div
        style={{
            backgroundColor: 'beige',
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "25px",
            marginTop: "100px",
            border: "1px solid black",
            borderRadius: "20px"

        }}
    >
      <center>
        {CARDS[index].en}
        <br />
        {answer ? (
          <>
            {CARDS[index].gd}
            <br /><br />
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
      </center>
    </div>
  );
};
