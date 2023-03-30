import React, { useEffect, useState } from 'react';
import { getMeals } from '../services/Meals';
import NutritionFactsTable from './NutritionFactsTable';
import {useJwt} from 'react-jwt';

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const token = localStorage.getItem("token");
    const {decodedToken, isExpired} = useJwt(token);

    
    const retrieveMeals = () => {
        getMeals(token)
            .then(res => {
                setMeals(res.data.sort((a, b) => {
                    if(a.date > b.date){
                        return -1
                    }
                }))
            })
        .catch(err => console.log(err.response))
    }

    useEffect(() => {
        if(token && !isExpired){
            retrieveMeals()
        }
    },[])

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    return (
        <>
        {(token && !isExpired)?
        
        <>
            <NutritionFactsTable meals={meals} setMeals={setMeals} mealView={true} style={style} />
        </>
        :
        <>
        <h3 style={{"paddingLeft":"5%"}}>Unauthized</h3>
        <p style={{"paddingLeft":"5%"}}>Please log in to view tracked meals.</p>
        </>
        }
        </>
    )

}
export default Meals