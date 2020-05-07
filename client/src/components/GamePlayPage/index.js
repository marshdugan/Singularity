import React, { useState, useEffect } from "react";
import "./style.css"
import API from "../../utils/API";

const handSize = 5;

function GamePlay(props) {
    const [userDeck, setUserDeck] = useState([]);
    const [opponentDeck, setOpponentDeck] = useState([]);
    const [user, setUser] = useState(
        {
            deck: [],
            hand: [],
            playedCards: [],
            avatar: "",
            health: 30,
    

        }
    );
    const [opponent, setOpponent] = useState(
        {
            deck: [],
            hand: [],
            avatar: "",
            health: 30,
            playedCards: []
        }
    );

    const [turn, setTurn] = useState("user");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        /* Load cards into the hand */
        /*   API.getOneUser(props.userName)
          .then(res => {
              console.log(res);
              console.log(res.data);
              setUserName(res.data.name)
          })
          .catch(err => console.log(err)) */
        API.getOneUser(props.userName)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setUserName(res.data.name)
                API.getOneDeck(res.data.deck[0]._id)
                    .then(res => {
                        console.log(res);
                        var startHand = [];
                        for (let i = 0; i < handSize; i++) {
                            startHand.push(res.data.card[i]);
                        }
                        console.log(startHand);
                        /*Remove hand cards from deck*/
                        var startDeck = [];
                        for (let i = handSize; i < res.data.card.length; i++) {
                            startDeck.push(res.data.card[i]);
                        }

                        setUser(
                            {
                                ...user,
                                deck: startDeck,
                                hand: startHand,
                                avatar: props.userAvatar
                            }
                        );

                        var opponentHandInit = res.data.card.reverse();
                        var opponentStartHand = [];
                        for (let i = 0; i < handSize; i++) {
                            opponentStartHand.push(opponentHandInit[i]);
                        }

                        /*Remove hand cards from deck*/
                        var opponentStartDeck = [];
                        for (let i = handSize; i < res.data.card.length; i++) {
                            opponentStartDeck.push(opponentHandInit[i]);
                        }

                        setOpponent(
                            {
                                ...opponent,
                                deck: opponentStartDeck,
                                hand: opponentStartHand,
                                avatar: props.opponentAvatar
                            }
                        );
                        setUserDeck(res.data.card);
                        setOpponentDeck(res.data.card.reverse());

                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }, []);

    function cardSelect(event) {
        if (turn === "user") {

            console.log(event.target);

            /*User played card*/
            var card = user.hand.filter(card => {
                // console.log(card._id);
                return card._id === event.target.id;
            });

            /*Remove played card from hand, if its a duplicate only remove the first one*/
            var found = false;
            var cardHand = user.hand.filter(card => {
                if (!found) {
                    if (card._id === event.target.id) {
                        found = true;
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });



            var newDeck = [];
            /*Move a card from the deck to the hand*/
            if (user.deck.length > 1) {
                cardHand.push(user.deck[0]);
                newDeck = user.deck.filter((card, index) => {
                    return index !== 0;
                });
            }
            if (user.deck.length === 1) {
                cardHand.push(user.deck[0]);
                newDeck = userDeck;
            }


            console.log("Card Hand:");
            console.log(cardHand);
            console.log("Deck:");
            console.log(newDeck);

            setUser({
                ...user,
                playedCards: [...user.playedCards, card[0]],
                hand: cardHand,
                deck: newDeck
            });
            var opponentHealth =  card[0].attack ? opponent.health - card[0].attack : opponent.health - card[0].cost;
            setOpponent({
                ...opponent,
                health: opponentHealth
            })

            setTimeout(function () { opponentMove(opponentHealth, newDeck, cardHand, [...user.playedCards, card[0]]); }, 3000);
            setTurn("opponent");


        }
    }

    function opponentMove(newHealth, userDeck, userHand, userPlayedCards) {

        var nextCard = opponent.hand[0];
        var updatedHand = opponent.hand.filter((card, index) => {
            return index !== 0;
        });

        var newDeck = [];
            /*Move a card from the deck to the hand*/
        if (opponent.deck.length > 1) {
            updatedHand.push(opponent.deck[0]);
             newDeck = opponent.deck.filter((card, index) => {
                return index !== 0;
             });
        }
        if (opponent.deck.length === 1) {
            updatedHand.push(opponent.deck[0]);
            newDeck = opponentDeck;
        }


        setOpponent({
            ...opponent,
            health: newHealth,
            hand: updatedHand,
            deck: newDeck,
            playedCards: [...opponent.playedCards, nextCard]
        })
        setUser({
            ...user,
            deck: userDeck,
            hand: userHand,
            playedCards: userPlayedCards,
            health: user.health - (nextCard.attack ? nextCard.attack : nextCard.cost)
        })
        setTurn("user");
    }

    return (
        <>
            <div className="container  gamearea">
                <div className="row opponentRow1 ">
                    <div class="opponentHand  ">
                        <div className="hp">
                            Health
                            <br />
                            {opponent.health}
                        </div>
                        {opponent.avatar === "" ? "" : <img className="opponentAvatar" src={require("../assets/images/" + opponent.avatar)} alt="Opponent Avatar"></img>}
                        {opponent.hand.map(card => {
                            return (
                                <img className="opponentCard" src={require("../assets/images/singularityCardBack.png")} alt={card.name}></img>
                            )
                        })}
                    </div>
                </div>
                <div className="row opponentRow2 ">
                    <div className="col s2 ">

                    </div>
                    <div className="col s10 opponentPlayedCardsArea">
                        <div class="opponentPlayedCards ">
                            {opponent.playedCards.map(card => {
                                if(card.attack){
                                    return (
                                        <div>
                                            <div className="opponentPlayedCardStats">
                                                Attack: {card.attack}
                                                <br />
                                                HP: {card.HP}
                                            </div>
                                            <img className="opponentCard" src={require("../assets/cardImages/" + card.image)} alt={card.name}></img>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div>
                                            <div className="opponentPlayedCardStats">
                                                Cost: {card.cost}
                                            </div>
                                            <img className="opponentCard" src={require("../assets/cardImages/" + card.image)} alt={card.name}></img>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="row userRow1 ">
                    <div className="col s2 resourceArea">

                    </div>
                    <div className="col s10 userPlayedCardsArea">
                        <div class="userPlayedCards ">
                            {user.playedCards.map(card => {
                                if(card.attack){
                                    return (
                                        <div>
                                            <img className="playedCard" id={card._id} src={require("../assets/cardImages/" + card.image)} alt={card.name} onClick={cardSelect}></img>
                                            <div className="userPlayedCardStats">
                                                Attack: {card.attack}
                                                <br />
                                                HP: {card.HP}
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return(
                                    <div>
                                        <img className="playedCard" id={card._id} src={require("../assets/cardImages/" + card.image)} alt={card.name} onClick={cardSelect}></img>
                                        <div className="userPlayedCardStats">
                                            Cost: {card.cost}
                                        </div>
                                    </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="row userRow2">
                    <div className="col s12 userHandArea">
                        <div class="userHand  ">
                            <div className="hp">
                                {userName}
                            </div>
                            <div className="hp">
                                Health
                                <br />
                                {user.health}
                            </div>

                            {user.avatar === "" ? "" : <img className="userAvatar" src={require("../assets/images/" + user.avatar)} alt="User Avatar"></img>}
                            {user.hand.map(card => {
                                if(card.attack){
                                    return (
                                        <div >
                                            <img className="userCard " id={card._id} src={require("../assets/cardImages/" + card.image)} alt={card.name} onClick={cardSelect}></img>
                                            <div class="userHandStats">
                                                Attack: {card.attack}
                                                <br />
                                                HP: {card.HP}
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div >
                                            <img className="userCard " id={card._id} src={require("../assets/cardImages/" + card.image)} alt={card.name} onClick={cardSelect}></img>
                                            <div class="userHandStats">
                                                Cost: {card.cost}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePlay;