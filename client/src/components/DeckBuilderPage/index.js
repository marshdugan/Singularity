import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../Grid";
import Button from "../Button";
import "./deckbuilder.css";
import API from "../../utils/API"
import GameCard from "../GameCard/index"

function DeckBuilderPage({ handleFormSubmit, userID }) {
    const [user, setUser] = useState("")
    const [avatar, setAvatar] = useState("")
    const [cards, setCards] = useState([]);
    const [deckCards, setDeckCards] = useState([])
    const [cardIds, setCardIds] = useState([])
    const [AZ, setAZ] = useState(false)

    useEffect(() => {
        API.getOneUser(userID)
            .then(res => {
                console.log('res', res)
                setUser(res.data.name)
                setAvatar(res.data.avatar)
            })
            .catch(err => console.log(err))

        API.getCards()
            .then(res => {
                setCards(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    const addToDeck = e => {

        console.log("clicked")
        let newCardName = e.target.getAttribute('data-card')
        let newCardId = e.target.getAttribute('data-id')
        const identicalCards = cardIds.filter(card => card === newCardId)
        if (identicalCards.length > 2) {
            for (let i = 0; i < cards.length; i++) {
                if (cards[i]._id === newCardId && cards[i].type !== "Resource") {
                    return alert("You can't add more than 3 of the same card unless it's a resource.")
                }
            }
        }

        setCardIds([...cardIds, newCardId])
        setDeckCards([...deckCards, newCardName])
        console.log(deckCards)
        console.log(cardIds)
    }

    const buildNewDeck = () => {
        let deckName = window.prompt("What do you want to call this deck?")

        if (!deckName) {
            return alert("You must gave your deck a name.")
        }

        const newDeck = {
            name: deckName,
            numberOfCards: cardIds.length,
            card: cardIds
        }
        const userDeck = {
            newDeck: newDeck,
            userID: userID
        }

        API.buildDeck(userDeck)
            .then(res => {
                console.log(res)
                setDeckCards([])
                setCardIds([])
            })
            .catch(err => console.log(err))
    }

    const removeCard = e => {
        const newDeck = deckCards.filter(card => card !== e.target.getAttribute('data-name'))
        const newIds = cardIds.filter(card => card !== e.target.getAttribute('data-id'))
        setDeckCards(newDeck)
        setCardIds(newIds)
    }

    const sortCards = e => {
        e.preventDefault();
        if (!AZ) {
            cards.sort((a, b) => a.name.localeCompare(b.name));
            setAZ(true)
        } else {
            cards.sort((a, b) => b.name.localeCompare(a.name));
            setAZ(false)
        }
    }

    return (
        <>
            <div className="row">
                <div className="col s4">
                    <div className="userInfo">
                        <img className="profilePic" src={avatar} alt="Avatar" />
                        <h6 className="">{user}</h6>
                        {deckCards.length < 20 ?
                            <>
                                <Button disabled classes='waves-effect waves-light center btn-large' onClick={buildNewDeck}>Complete Deck</Button>
                                <h6 id="cardMessage">You must add at least {deckCards.length < 20 ? 20 - deckCards.length : 0} more {deckCards.length === 19 ? "card." : "cards."}</h6>
                            </> :
                            <Button classes='waves-effect waves-light center btn-large' onClick={buildNewDeck}>Complete Deck</Button>}
                    </div>
                    <div className="row deckSpace">
                        {deckCards && deckCards.map(card => (
                            <>
                                <div className="col deckEntry">
                                    <h5 style={{ fontWeight: "900" }}>{card}</h5>
                                    <p data-name={card} data-id={card + Math.floor(Math.random() * 100)} onClick={removeCard} className="deleteCard">✖</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="col s8">
                    <h4 className="deckBuilderTitle">Deck Builder</h4>
                    <div className="sorting">
                        <Button onClick={sortCards} classes='col s2' style={{ marginLeft: "5px", marginTop: "5px" }}>Sort Cards</Button>
                    </div>

                    <div className="row cardArea">
                        {cards && cards.map(card => {
                            if (card.type === "Resource")
                                return <div className="col s12 m6 l3 cardDiv">
                                    <GameCard
                                        key={card._id}
                                        id={card._id}
                                        data-card={card.name}
                                        name={card.name}
                                        image={card.image}
                                        attack={card.attack}
                                        defense={card.defense}
                                        HP={card.HP}
                                        cardBody={card.cardBody}
                                        cost={card.cost}
                                        type={card.type}
                                        class={card.class}
                                        onClick={addToDeck}
                                    />
                                </div>
                        })}

                        {cards && cards.map(card => {
                            if (card.type !== "Resource")
                                return <div className="col s12 m6 l3 cardDiv">
                                    <GameCard
                                        key={card._id}
                                        id={card._id}
                                        data-card={card.name}
                                        name={card.name}
                                        image={card.image}
                                        attack={card.attack}
                                        defense={card.defense}
                                        HP={card.HP}
                                        cardBody={card.cardBody}
                                        cost={card.cost}
                                        type={card.type}
                                        class={card.class}
                                        onClick={addToDeck}
                                    />
                                </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeckBuilderPage;













