import React, {useState, useEffect} from 'react'
import { getMeals } from '../services/Meals'
import DailyTotal from './DailyTotal'

const DailyView = () => {

    const [meals, setMeals] = useState([])
    const [dates, setDates] = useState([])

    const retrieveMeals = () =>{
        getMeals()
        .then(res =>{
          setMeals(res.data)
          console.log(res.data)
          const datesList = res.data.map(m => new Date(m.date).toLocaleDateString())
          setDates([...new Set(datesList)])
        })
        .catch(err => console.log(err.response))
    }

    useEffect(() => {
      retrieveMeals()
    },[])

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    const mealsByDate = dates.map(d => meals.filter(m => (new Date(m.date).toLocaleDateString()) === d))

    const DateView = mealsByDate.map(d => 
        d.map(m => m.calo))
    
  return (
    <div>
        <table className='table table-striped'>
            <thead>
                <tr className='bg-dark'>
                    <th style={style} className='text-light'>Date</th>
                    <th style={style} className='text-light'>Total Calories</th>
                    <th style={style} className='text-light'>Total Carbohydrates</th>
                    <th style={style} className='text-light'>Total Protein</th>
                    <th style={style} className='text-light'>Total Fat</th>
                    <th style={style} className='text-light'>Total Phosphorus</th>
                    <th style={style} className='text-light'>Total Potassium</th>
                    <th style={style} className='text-light'>Total Sodium</th>
                </tr>
            </thead>
            <tbody>
                {mealsByDate.map(d =>{
                    return(
                    <tr key={d[0].date}>
                        <DailyTotal style={style} meals={d}/>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default DailyView