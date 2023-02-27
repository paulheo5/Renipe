import React, { useEffect, useState } from 'react';
import { getRecipe } from '../services/SavedRecipes';


const Saved = () => {
    const [recipe, setRecipe] = useState([]);



    const savedRecipe = () => {
        getRecipe().then(res => {
            setRecipe(res.data)
        })
            .catch(err => console.log(err.response))
    }

    useEffect(() => {
        savedRecipe()
        console.log()
    }, [])

    const style = { "padding": "3px", "paddingLeft": "10px", "paddingRight": "10px" }
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr className='bg-dark'>
                        <th className='text-light' style={style}>Title</th>
                        <th className='text-light' style={style}>Source</th>
                    </tr>
                </thead>
          {recipe.map(recipes => {
                    return (
                        <tbody>
                            <tr>
                                <td style={style}>{recipes.title}</td>
                                <td style={style}>{recipes.sourceUrl}</td>
                                <td style={style}>
                                    <button className='btn btn-danger text-light'>Delete</button>
                                    <button style={{ "marginLeft": "1em" }} className='btn btn-warning text-dark'>Update</button>
                                </td>
                            </tr>
                        </tbody>
                    )
          })}
                </table>
        </>
        )
}
export default Saved;