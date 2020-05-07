import React from "react";
import "./style.css";
const techBack = require('../assets/images/techBack.jfif')
const arcaneBack = require( '../assets/images/arcaneBack.jpg')

function GameCard(props) {
  let cardBackground = props.class == 'Tech' ? techBack : arcaneBack;
  // console.log(cardBackground)
  const cardStyle = {
    cursor: 'pointer',
    width: '90%',
   height: '40vh',
    backgroundImage: `url("${cardBackground}")`,
    backgroundSize: 'contain'
  }
   


  return (
    <div className='gameCard' onClick={props.onClick} data-card={props.name} data-id={props.id} style={cardStyle}>
      <span className='center cardName' data-card={props.name} data-id={props.id}>{props.name}</span>
      <img className='cardImage center' data-card={props.name} data-id={props.id} src={require('../assets/cardImages/' + props.image)} />
      <br />
      <div className='cardText center' data-card={props.name} data-id={props.id}>
        {props.cost ? <> <span>Cost: {props.cost} </span> <br /> </> : ""}
        {props.HP ? <> <span>HP: {props.HP} </span> <br /> </> : ""}
        {props.attack ? <> <span>Attack: {props.Attack} </span> <br /> </> : ""}
        {props.defense ? <> <span>Defense: {props.defense} </span> <br /> </> : ""}
        {props.type ? props.type === "Resource" ? <> <span style={{color: "blue"}}><b>Type: {props.type}</b></span><br /> </> : <> <span>Type: {props.type} </span> <br /> </> : ""}
        {props.class ? <> <span>Class: {props.class} </span> <br /> </> : ""}
        {/* {props.mechanics ? props.mechanics : ""} */}
      </div>
    </div>
  );
}

export default GameCard;