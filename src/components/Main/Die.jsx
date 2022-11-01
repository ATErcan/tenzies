const Die = (props) => {
  return (
    <div
      className="die"
      style={
        props.die.isHeld
          ? { backgroundColor: "#59E391", color: "#fff" }
          : { backgroundColor: "#fff", color: "#000" }
      }
    >
      {props.value}
    </div>
  );
};

export default Die;
