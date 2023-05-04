// square space, fill with red/yellow circle depending on state
import { useState } from "react";

const Position = () => {
  const [content, setContent] = useState("blue");

  return (
    <div className="position" style={{ backgroundColor: { content } }}></div>
  );
};
