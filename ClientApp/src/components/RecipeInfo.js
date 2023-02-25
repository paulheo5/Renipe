import React, { useEffect } from 'react'
import { useState } from 'react'
import { recipeInfo } from '../services/Spoonacular'
import NutritionFacts from './NutritionFacts'
import './RecipeInfo.css';
import { Button } from './Button';


const RecipeInfo = () => {
    const [info, setInfo] = useState({});
    const [nutrients, setNutrients] = useState([])
    //const recipe = SearchRecipe();
    //var id = recipe.state.id;
    const recipeid = window.localStorage.getItem("id");
    
    const [hide, setHide] = useState(true);
    
    const retrieveMeals = (id) => {
        recipeInfo(id)
        .then(res => {
            setInfo(res.data);
            setNutrients(res.data.nutrition.nutrients)
            console.log(res.data);
        })
        .catch(err => console.log(err.response))
    }
    
    useEffect(() => {
        retrieveMeals(recipeid)
    }, [])

    const foodName = info.title;
    let calories = Math.round(nutrients.filter(n => n.name == "Calories")[0]?.amount) ?? -1;
    const carbohydrates = Math.round(nutrients.filter(n => n.name == "Carbohydrates")[0]?.amount) ?? 0;
    const protein = Math.round(nutrients.filter(n => n.name == "Protein")[0]?.amount) ?? 0;
    const fat = Math.round(nutrients.filter(n => n.name == "Fat")[0]?.amount) ?? 0;
    const phosphorus = Math.round(nutrients.filter(n => n.name == "Phosphorus")[0]?.amount) ?? 0;
    const potassium = Math.round(nutrients.filter(n => n.name == "Potassium")[0]?.amount) ?? 0;
    const sodium = Math.round(nutrients.filter(n => n.name == "Sodium")[0]?.amount) ?? 0;

    calories = calories === -1 ? (4*(carbohydrates + protein)) + (9 * fat) : calories;


    const food = {
        "foodName" : foodName,
        "caloriesPerServing" : calories,
        "carbohydratesPerServing" : isNaN(carbohydrates) ? 0 : carbohydrates,
        "proteinPerServing" : isNaN(protein) ? 0 : protein,
        "fatPerServing" : isNaN(fat) ? 0 : fat,
        "phosphorusPerServing" : isNaN(phosphorus) ? 0 : phosphorus,
        "potassiumPerServing" : isNaN(potassium) ? 0 : potassium,
        "sodiumPerServing" : isNaN(sodium) ? 0 : sodium,
        "date" : new Date()
    }

    return (
        <>
         
            <div className = 'recipe'>
                <h1 className = 'recipe-title'>{info.title}</h1>
                <img className='recipe-image' src={info.image} />
                <p className='recipe-info' dangerouslySetInnerHTML={{ __html: info.summary }}/>

             
        
                 
                
        
            </div>
        <div>
            {/*{JSON.stringify(info)}*/}

            {/*{info.map(infos => {*/}
            {/*    <div>{infos.title}</div>*/}

            {/*    })}*/}
         
            <br />
            <Button className='btn'  onClick={() => setHide(!hide)}>Nutrition Info</Button>
            <table className="table" hidden={hide} >
                <thead>
                    <tr className='bg-dark'>
                        <th className='text-light'>Name</th>
                        <th className='text-light'>Calories</th>
                        <th className='text-light'>Carbohydrates</th>
                        <th className='text-light'>Protein</th>
                        <th className='text-light'>Fat</th>
                        <th className='text-light'>Phosphorus</th>
                        <th className='text-light'>Potassium</th>
                        <th className='text-light'>Sodium</th>
                    </tr>
                </thead>
                <NutritionFacts food={food} />
            </table>

            </div>
        </>

    )

}



export default RecipeInfo;