import React from 'react'
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
                <input className='form-control' id='search' type='search' placeholder='Enter ingredients, eg. "bacon, eggs"' onChange={handleSearch}></input>
            </form>
            </div>

            <div className='cards__recipecontainer'>


                  
                {results.map(result => (
                    <span key={result.id}>
                            <div className='cards'>

                            <CardItem id={result.id}
                                                src={result.image}
                                                text={result.title}

                                                path='/RecipeInfo'
                                            />
                            
                                </div>
                    </span>
                            
                            
                            
                        ))}
       
                
            </div>
        </>
        );

}




export default SearchRecipe;