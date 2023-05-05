// square space, fill with red/yellow circle depending on state
import { useState } from "react";

const Position = () => {
  const [content, setContent] = useState("blue");

  function playerSelect1() {
    setContent("yellow");
  }

  function playerSelect2() {
    setContent("red");
  }

  return (
    <div className="position-space" style={{ backgroundColor: "blue" }}>
      {/* &nbsp; */}O
    </div>
  );
};

export default Position;
