import React from 'react'
import { useState } from 'react'
import { searchSpoon } from '../services/Spoonacular'
import './Cards.css';
import CardItem from '../components/CardItem';

const SearchRecipe = () => {

    const [searchTerm, setSearchTerm] = useState()

    const [results, setResults] = useState([])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const search = (e) => {
        e.preventDefault()
        searchSpoon(searchTerm)
            .then(res => {
                setResults(res.data);
                console.log(res);
                
         })


            .catch(err => console.log(err.response))
    }//const showRecipe = (recipe) => {
    //    const name = recipe.title;
    //    return ({
    //        "title": title
    //        })
    //}
    //useEffect(() => {
    //    search();
    //}, []);



    return (
        <>
        <div>
            <form onSubmit={search}>
                <input id='search' type='search' placeholder='Enter ingredients' onChange={handleSearch}></input>
                <button type='submit'>Search</button>
            </form>
            </div>

            <div className='cards__recipecontainer'>


                  
                    {results.map(result => (
                        <React.Fragment key={result.id}>
                            <div className='cards'>

                               
                                            <CardItem 
                                                src={result.image}
                                                text={result.title}

                                                path='/RecipeInfo'
                                            />
                            
                                </div>
                    </React.Fragment>
                            
                            
                            
                        ))}
       
                
            </div>
        </>
        );

}




export default SearchRecipe;