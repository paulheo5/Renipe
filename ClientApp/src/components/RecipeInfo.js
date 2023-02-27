import React, { useEffect } from 'react'
import { useState } from 'react'
import { recipeInfo } from '../services/Spoonacular'
import NutritionFacts from './NutritionFacts'
import styles from './RecipeInfo.css';
import { Button } from './Button';
import { trackRecipe, updateRecipe, deleteRecipe } from '../services/SavedRecipes';
import { useNavigate } from 'react-router-dom';


const RecipeInfo = () => {
    const [info, setInfo] = useState({});
    const [nutrients, setNutrients] = useState([])
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])
    //const recipe = SearchRecipe();
    //var id = recipe.state.id;
    const recipeid = window.localStorage.getItem("id");
    
    const [hide, setHide] = useState(true);

    const [servingSize, setServingSize] = useState("")

    const navigate = useNavigate();


    
    const retrieveMeals = (id) => {
        recipeInfo(id)
        .then(res => {
            setInfo(res.data);
            setNutrients(res.data.nutrition.nutrients);
            setSteps(res.data.analyzedInstructions[0].steps);
            setIngredients(res.data.extendedIngredients)
            setServingSize(res.data.nutrition.weightPerServing.amount + res.data.nutrition.weightPerServing.unit);
            console.log(res.data.analyzedInstructions[0].steps);
            console.log(res.data);
        })
        .catch(err => console.log(err.response))
    }
    
    useEffect(() => {
        retrieveMeals(recipeid)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const savedRecipe = {
            "recipeId": info.id,
            "title": info.title,
            "sourceUrl": info.sourceUrl
        }
        console.log(savedRecipe)
        trackRecipe(savedRecipe).then(res => {
            console.log(res.data)
            navigate('/SavedRecipes')
        }).catch(err => console.log(err.response))
    }

    const foodName = info.title;
    let calories = isNaN(Math.round(nutrients.filter(n => n.name == "Calories")[0]?.amount)) ? -1 : Math.round(nutrients.filter(n => n.name == "Calories")[0]?.amount);
    const carbohydrates = isNaN(Math.round(nutrients.filter(n => n.name == "Carbohydrates")[0]?.amount)) ? 0 : Math.round(nutrients.filter(n => n.name == "Carbohydrates")[0]?.amount);
    const protein = isNaN(Math.round(nutrients.filter(n => n.name == "Protein")[0]?.amount)) ? 0 :Math.round(nutrients.filter(n => n.name == "Protein")[0]?.amount) ;
    const fat = isNaN(Math.round(nutrients.filter(n => n.name == "Fat")[0]?.amount)) ? 0 : Math.round(nutrients.filter(n => n.name == "Fat")[0]?.amount);
    const phosphorus = isNaN(Math.round(nutrients.filter(n => n.name == "Phosphorus")[0]?.amount)) ? 0 : Math.round(nutrients.filter(n => n.name == "Phosphorus")[0]?.amount);
    const potassium = isNaN(Math.round(nutrients.filter(n => n.name == "Potassium")[0]?.amount)) ? 0 : Math.round(nutrients.filter(n => n.name == "Potassium")[0]?.amount);
    const sodium = isNaN(Math.round(nutrients.filter(n => n.name == "Sodium")[0]?.amount)) ? 0 : Math.round(nutrients.filter(n => n.name == "Sodium")[0]?.amount);
    const servingSizeUnit = "";

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
        "servingSize" : servingSize,
        "servingSizeUnit" : servingSizeUnit,
        "date" : new Date()
    }

    return (
        <>
            <div className='dish'>  

                <article>
                    <header className = 'head'>
                        <img src={info.image} alt="dish" />
                        <h2>{info.title}</h2>                
                        <p>
                            Servings: <span>{info.servings}</span>
                        </p>
                        <p>
                            Time: <span>{info.readyInMinutes}</span>
                        </p>
                    </header>
                    <section className='head'>
                        <h3 className ='h3font'>Overview</h3>
                        <div className = 'summary' dangerouslySetInnerHTML={{ __html: info.summary }} />
                    </section>
                    <section className={`dishIngredients`}>
                    <h3>Ingredients</h3>
                        <div className = 'head'>
                            <ul>
                                {ingredients.map((ingredient) => {
                                    return (

                                        <li key={ingredient.id}>
                                            <img style={{"width":"100px"}} src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} />
                                            {ingredient.original}
                                        </li>
                                    )
                                })}
                                </ul>
                        </div>
                        <h3>Instructions</h3>
                        <div className = 'head'>
                            <ul>
                                {steps.map((step) => {
                                    return (

                                        <li key={step.number}>
                                            {step.step}
                                        </li>
                                    )
                                })}
                                </ul>
                        </div>
                    </section>

                </article>

                <div style={{ flexDirection: "row" }}>
          
                    <Button className='btn' onClick={() => setHide(!hide)}>Nutrition Info</Button>
                    <Button onClick={handleSubmit } >Save this!</Button>

                </div>
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
                        <th className='text-light' style={{'width':'8em'}}>Serving Size</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <NutritionFacts food={food} />
                    </table>
         

            </div>
        </>

    )

}



export default RecipeInfo;