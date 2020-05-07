import React, { useState, useEffect } from 'react'
import './search.css'
import Input from '../Input'
import Button from '../Button'
import DropdownMenu from '../DropdownMenu';
import API from "../../utils/API"
import GameCard from "../GameCard/index"

function Search() {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([])
    const [AZ, setAZ] = useState(false)
    // FOR LATER USE
    // const [params, setParams] = useState([['All', 'Unit', 'Spell'], ['All', '1', '2', '3', '4', '5+'], ['10', '20', '30']]);
    // const labels = ['Type', 'Cost', 'Results'];

    // const [params, setParams] = useState([['100', '75', '50', '20', '10']]);
    // const labels = ['Results'];

    const [form, setForm] = useState({
        Search: "",
        // Type: "Unit",
        // Cost: "1",
        // Results: 100
    })

    useEffect(() => {
        API.getCards()
            .then(res => {
                setCards(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = event => {
        const { value, name } = event.target;
        if (name === 'Results') {
            setForm({ ...form, [name]: parseInt(value) })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        console.log(form)

        const newCards = cards.filter(card => card.name.toLowerCase().includes(form.Search))

        // FOR LATER USE
        // const newCards2 = newCards.filter(card => card.type === form.Type)
        // const newCards3 = newCards2.filter(card => card.cost === parseInt(form.Cost))

        setFilteredCards(newCards)
    }

    const sortCards = e => {
        e.preventDefault();

        if (!AZ) {
            filteredCards.sort((a, b) => a.name.localeCompare(b.name));
            setAZ(true)
        } else {
            filteredCards.sort((a, b) => b.name.localeCompare(a.name));
            setAZ(false)
        }
    }

    return (
        <div className='row'>
            <form className="singularityInput" onSubmit={handleFormSubmit}>
                <div className='row'>
                    <Input
                        type='text'
                        className='center col s7'
                        name="Search"
                        onChange={handleInputChange}

                        placeholder="Search for a card" />
                    <Button onClick={handleFormSubmit}
                        classes='col s2'>
                        Search <i className="fas fa-search" /></Button>
                    <Button onClick={sortCards} classes='col s2' style={{ marginLeft: "5px" }}>Sort</Button>
                </div>
                {/* <div className='row'>
                    {params.map((arr, index) => (
                        <DropdownMenu
                            key={index}
                            classes='col s2'
                            defaultValue={arr[0]}
                            options={arr}
                            name={labels[index]}
                            handler={handleInputChange}
                        />
                    ))}

                </div> */}
            </form>
            <div className="row cardArea">
                {filteredCards.map(card => (
                    <div className="col s12 m6 l3 cardDiv">
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
                        // onClick={addToDeck}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Search;