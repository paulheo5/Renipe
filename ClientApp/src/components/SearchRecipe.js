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
                console.log(res)
         })

            .catch(err => console.log(err.response))
    }




    return (
        <div>
            <form onSubmit={search}>
                <input id='search' type='search' placeholder='Enter ingredients' onChange={handleSearch}></input>
                <button type='submit'>Search</button>
            </form>
        </div>
        );

}




export default SearchRecipe;