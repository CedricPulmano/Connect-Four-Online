// square space, fill with red/yellow circle depending on state
import { useState } from "react";
import "./Position.css";

const Position = () => {
  const [content, setContent] = useState("white");

  function playerSelect1() {
    setContent("yellow");
  }

  function playerSelect2() {
    setContent("red");
  }

  function randomizePlayer() {
    if (Math.random() > 0.5) {
      playerSelect1();
    } else {
      playerSelect2();
    }
  }

  return (
    <div className="position-space">
      <div
        className="piece"
        style={{ backgroundColor: content }}
        onClick={randomizePlayer}
      ></div>
    </div>
  );
};

export default Position;
