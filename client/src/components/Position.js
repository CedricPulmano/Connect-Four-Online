// square space, fill with red/yellow circle depending on state
import { useState } from "react";
import "./Position.css";

const Position = () => {
  const [content, setContent] = useState("red");

  function playerSelect1() {
    setContent("yellow");
  }

  function playerSelect2() {
    setContent("red");
  }

  return (
    <div className="position-space" style={{ backgroundColor: "#4977eb" }}>
      <div className="piece" style={{ backgroundColor: content }}></div>
    </div>
  );
};

export default Position;
