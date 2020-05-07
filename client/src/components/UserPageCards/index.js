import React, { useState, useEffect } from 'react'
import './style.css'
import API from "../../utils/API"
import GameCard from "../GameCard"

function UserPageCards(props) {
    const [test, setTest] = useState('');
    const [cards, setCards] = useState([]);
    const [userCards, setUserCards] = useState([]);

    const arr = [];

    // TEMPORARY, JUST TO GET CARDS TO DISPLAY
    useEffect(() => {
        API.getOneUser(props.user)
            .then(res => {
                console.log(res.data)
                setCards(res.data.deck[0].card)
                setTest('.')
            })
            .then(() => {
                console.log("cards", cards)

                for (let i = 0; i < cards.length; i++) {
                    API.getOneCard(cards[i])
                        .then(res => {
                            arr.push(res.data)
                        })
                        .catch(err => console.log(err))
                }

                setTimeout(() => {
                    setUserCards(arr)
                   }, 2000)

            })
            .catch(err => console.log(err))
    }, [test])

    return (
        <>
            <div className="row cardArea">

                {userCards.length >= 20 ? userCards.map(card => (
                    <div className="col s6 m4 l2 cardDiv">
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
                            class={card.class}
                            mechanics={card.mechanics}
                        // onClick={addToDeck}
                        />
                    </div>
                )) : <h4 className="center">Loading your cards...</h4>}

                {/* {userCards.map(card => (
                    <div className="col s6 m4 l2 cardDiv">
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
                            class={card.class}
                            mechanics={card.mechanics}
                        // onClick={addToDeck}
                        />
                    </div>
                ))} */}

            </div>
        </>
    )
}

export default UserPageCards;