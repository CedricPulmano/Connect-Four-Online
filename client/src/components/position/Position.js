import "./Position.css";

const Position = ({ pieceColor }) => {
  return (
    <div className="position-space">
      <div className="piece" style={{ backgroundColor: pieceColor }}></div>
    </div>
  );
};

export default Position;
