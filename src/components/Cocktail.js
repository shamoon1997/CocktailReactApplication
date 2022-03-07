import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'
import '../styles/cocktail.css'
function Cocktail() {
    const [Loader, setLoader] = useState(true)
    const [Drinks, setDrinks] = useState([])
    const navigate = useNavigate();
    const getCocktailDetails = (drinkName) => {
        //event.preventDefault();
        console.log(drinkName)
        navigate(`/CocktailDetails`, { state: { drinkName: drinkName } });
    };
    useEffect(() => {
        fetchTours()
    }, [])
    const fetchTours = async () => {
        try {
            let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic");
            response = await response.json();
            setLoader(false)
            setDrinks(response.drinks)
        }
        catch (error) {
            setLoader(false)
            console.log(error)
        }
    }
    const removeDrink = async (drinkName) => {
        const filteredDrinks = Drinks.filter((drink) => drink.strDrink !== drinkName)
        setDrinks(filteredDrinks)
        console.log(drinkName)
    };
    return (
        Loader ? <Loading /> : <div>
            <div className="parentContainer">
                <h1>Alcoholic Drinks </h1>
            </div>
            {Drinks.length === 0 ? <div className="parentContainer">
                <h2>No Drinks left</h2>
            </div> :
                <div className="drinksContainer">
                    {Drinks.map((drink) => {
                        return (
                            <div key={drink.strDrink} className="Cards">
                                <img src={drink.strDrinkThumb} alt="drinks here" onClick={() => {
                                    getCocktailDetails(drink.strDrink);
                                }}></img>
                                <div className="innerCards">
                                    <div>
                                        <h5>{drink.strDrink}</h5>
                                    </div>
                                    <div>
                                        <button onClick={() => removeDrink(drink.strDrink)}> Not interested</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default Cocktail

