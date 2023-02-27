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
        //   const updatedDates = res.data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(m => new Date(m.date).toLocaleDateString())
        //   setDates([...new Set(updatedDates)])
        })
        .catch(err => console.log(err.response))
    }

    useEffect(() => {
      retrieveMeals()
    },[])

    useEffect(() => {
        const updatedDates = meals.sort((a, b) => new Date(b.date) - new Date(a.date)).map(m => new Date(m.date).toLocaleDateString())
        setDates([...new Set(updatedDates)])
    },[meals])

    const mealsByDate = dates.map(d => meals.filter(m => (new Date(m.date).toLocaleDateString()) === d))

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    
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
                    <th style={style} className='text-light'></th>
                </tr>
            </thead>
            <tbody>
                {mealsByDate.filter(m => m.length > 0).map(d =>{
                    return(
                    <React.Fragment key={d[0].date}>
                        <DailyTotal style={style} meals={d} setMeals={setMeals} dates={dates} setDates={setDates} />
                    </React.Fragment>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default DailyView