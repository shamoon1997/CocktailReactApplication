import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Loading from './Loading';
import '../styles/CocktailDetails.css'
function CocktailDetails() {
    const location = useLocation();
    const [Loader, setLoader] = useState(true);
    const [CocktailDetail, setCocktailDetail] = useState();
    const fetchCocktailDetail = async () => {
        try {
            let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${location.state.drinkName}`);
            response = await response.json();
            console.log(response);
            setCocktailDetail(response.drinks[0], () => {
                console.log("asdas", CocktailDetail)
            });
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCocktailDetail();
    }, [])
    return (
        Loader ? <Loading /> :
            <div className="cockDetails-container">
                <div className="cockDetails-image">
                    <img src={CocktailDetail.strDrinkThumb} alt="Cocktail here "></img>
                </div>
                <div className="cockDetails-description">
                    <div className="one">
                    <h2>Drink Name : <span>{CocktailDetail.strDrink}</span></h2>
                    </div>
                    <div className="two">
                    <h2>Drink Category : <span>{CocktailDetail.strCategory}</span></h2>
                    </div>
                    <div className="two">
                    <h2>Drink Glass : <span>{CocktailDetail.strGlass}</span></h2>
                    </div>
                    <div className="two">
                    <h2>Drink Alcoholic : <span>{CocktailDetail.strAlcoholic}</span></h2>
                    </div>
                </div>
            </div>
    )
}

export default CocktailDetails
