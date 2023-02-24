import React from 'react'
import { useState } from 'react'
import { searchSpoon } from '../services/Spoonacular'

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
                setResults(res)
                
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
            <h1>{setResults.title}</h1>
            <div>
                {results.length > 0 && (
                    <ul>
                        {results.map(result => (
                            <li key={result.id}>{result.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
        );

}




export default SearchRecipe;