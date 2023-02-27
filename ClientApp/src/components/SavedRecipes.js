import React, { useEffect, useState } from 'react';
import { getRecipe } from '../services/SavedRecipes';
import { deleteRecipe } from '../services/SavedRecipes';


const Saved = () => {
    const [recipe, setRecipe] = useState([]);

    const [hide, setHide] = useState(true);

    const savedRecipe = () => {
        getRecipe().then(res => {
            setRecipe(res.data)
            console.log(res.data)
        })
            .catch(err => console.log(err.response))
    }

    useEffect(() => {
        savedRecipe()
    }, [])
    //function clickDelete(food){
    //    const result = confirm(`Are you sure you want to delete ${food.title}?`)
    //    if (result) {
    //        deleteRecipe(food.id)
    //            .then(() => {
    //                const updatedRecipe = recipe.filter(m => m.id != food.id)
    //                setRecipe(updatedRecipe)
    //            })
    //            .catch(err => console.log(err.response))
    //    }


    //}

    const style = { "padding": "3px", "paddingLeft": "10px", "paddingRight": "10px" }
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr className='bg-dark'>
                        <th className='text-light' style={style}>Title</th>
                        <th className='text-light' style={style}>Source</th>
                        <th className='text-light' style={style}></th>
                    </tr>
                </thead>
          {recipe.map(recipes => {
                    return (
                        <tbody>
                            <tr>
                                <td style={style}>{recipes.title}</td>
                                <td style={style}>{recipes.sourceUrl}</td>
                                <td style={style}>
                                    <button className='btn btn-danger text-light' onClick={() => {
                                        const result = confirm(`Are you sure you want to delete ${recipes.title}?`)
                                        const updatedRecipeList = recipe.filter(r => r.id !== recipes.id)
                                        if (result) {
                                            deleteRecipe(recipes.id)
                                                .then(() => {
                                           
                                                    setRecipe(updatedRecipeList)
                                              
                                                })
                                                .catch(err => console.log(err.response))
                                        }
                                    }}
                                    > Delete</button>
                                    {/*<button className='btn btn-danger text-light' onClick={clickDelete( recipes )}>Delete</button>*/}
                                   {/* <button style={{ "marginLeft": "1em" }} className='btn btn-warning text-dark' onClick={() => setHide(!hide)}>Update</button>*/}
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