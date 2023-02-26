﻿import React from 'react'
import { useState } from 'react'
import { searchSpoon } from '../services/Spoonacular'
import './Cards.css';
import CardItem from '../components/CardItem';
import { useNavigate } from 'react-router-dom'

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
    }
    //useEffect(() => {
    //    search();
    //}, []);

//    React.useEffect(() => {
//    console.log("Side Effect")
//    window.localStorage.setItem("name", name)
//}, [name]);


    return (
        <>
        <div>
            <form onSubmit={search}>
                <input id='search' type='search' placeholder='Enter ingredients' onChange={handleSearch}></input>
                <button type='submit'>Search</button>
            </form>
            </div>

            <div className="col-md-3 mb-1 p-3 d-flex justify-content-center">


                  
                {results.map(result => (
                    <div>
                    <span key={result.id}>
                            <div>

                            <CardItem id={result.id}
                                                src={result.image}
                                                text={result.title}

                                                path='/RecipeInfo'
                                            />
                            
                                </div>
                        </span>
                        </div>
                            
                            
                            
                        ))}
       
                
            </div>
        </>
        );

}




export default SearchRecipe;