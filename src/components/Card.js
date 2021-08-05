import "./Card.css";

const Card = (props) => {
  return (
    <div className="Card-container">
      <div className="Card-image-container">
        <img
          src={props.currentImage}
          alt={props.state}
          className="Card-image"
        />
      </div>
      <div className="Card-name">
        {props.name[0]?.toUpperCase() + props.name.slice(1, props.name.length)}
      </div>
      <div className="Card-description">{props.description}</div>
    </div>
  );
};

export default Card;
