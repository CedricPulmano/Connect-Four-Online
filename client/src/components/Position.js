// square space, fill with red/yellow circle depending on state

const Position = () => {
  const [content, setContent] = useState("blue");

  return (
    <div className="position" style={{ backgroundColor: { content } }}></div>
  );
};
