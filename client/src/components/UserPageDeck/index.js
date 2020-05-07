import React, { useState, useEffect } from 'react'
import './style.css'
import API from "../../utils/API"
import Deck from "../Deck";
function UserPageDeck(props) {
    // const [userData, setUserData] = useState([]);
    // const [deckData, setDeckData] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [numOfCards, setNumOfCards] = useState("");

    // useEffect(() => {
    //     API.getOneUser(props.user)
    //         .then(res => {
    //             for (let i = 0; i < res.data.deck.length; i++) {
    //                 console.log('res', res.data.deck[i])
    //                 setDeckData([...deckData, {
    //                     name: res.data.deck[i].name,
    //                     numberOfCards: res.data.deck[i].numberOfCards
    //                 }])
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    // TEMPORARY, JUST TO GET CARDS TO DISPLAY

    useEffect(() => {
        API.getOneUser(props.user)
            .then(res => {
                if (res.data.deck[0]) {
                setDeckName(res.data.deck[0].name)
                setNumOfCards(res.data.deck[0].numberOfCards)
                }
            })
    }, [])

    // const dummyArr = ['1243', '1123']

    // console.log("deck", deckData);
    // const deckArr = userData.deck

    return (
        <>
            {/* <Deck 
                name={userData.name}
                deck={deckArr}
            /> */}

            {/* {userData.deck.map(item => (
            <Deck
                deck = { item }
            />
            ))} */}

            <h5 className="center">Deck name: {deckName}</h5>
            <h5 className="center">Number of cards: {numOfCards}</h5>
        </>
    )



}
export default UserPageDeck;