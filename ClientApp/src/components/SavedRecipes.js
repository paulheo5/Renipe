import React, { useEffect, useState } from 'react';
import { getRecipe } from '../services/SavedRecipes';
import { deleteRecipe } from '../services/SavedRecipes';
import { useNavigate } from 'react-router-dom';
import {useJwt} from 'react-jwt';


const Saved = () => {
    const [recipe, setRecipe] = useState([]);
    const token = localStorage.getItem("token");
    const {decodedToken, isExpired} = useJwt(token);

    const [hide, setHide] = useState(true);

    const savedRecipe = () => {
        getRecipe(token).then(res => {
            setRecipe(res.data)
            console.log(res.data)
        })
            .catch(err => console.log(err.response))
    }

    useEffect(() => {
        if(token && !isExpired){
            savedRecipe()
        }
    }, [])

    const navigate = useNavigate();

    const style = { "padding": "3px", "paddingLeft": "10px", "paddingRight": "10px" }
    return (
        <>
        {(token && !isExpired)?
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
                        <React.Fragment key={recipes.id}>
                        <tbody>
                            <tr>
                                <td style={style}>{recipes.title}</td>
                                    <td style={style}>
                                        <a href={recipes.sourceUrl}> {recipes.sourceUrl}</a>
                                        </td>
                                <td style={style}>
                                    <button className='btn btn-primary text-light' onClick = {() => {
                                        window.localStorage.setItem("id", recipes.recipeId)
                                        navigate("/RecipeInfo")
                                    }}>Details</button>
                                        <button style={{"marginLeft":"1em"}}  className='btn btn-danger text-light' onClick={() => {
                                            const result = confirm(`Are you sure you want to delete ${recipes.title}?`)
                                        const updatedRecipeList = recipe.filter(r => r.id !== recipes.id)
                                        if (result) {
                                            deleteRecipe(recipes.id, token)
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
                        </React.Fragment>
                    )
          })}
            </table>
        :
        <>
            <h3 style={{"paddingLeft":"5%"}}>Unauthorized</h3>
            <p style={{"paddingLeft":"5%"}}>Please login to see saved recipes.</p>
        </>
        }
        </>
    )

}
export default Saved;