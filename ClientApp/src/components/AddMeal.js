import React from 'react'
import { useState } from 'react'
import { searchFdc } from '../services/Fdc'
import {Button} from './Button'

const AddMeal = () => {

    const [searchTerm, setSearchTerm] = useState()

    const [results, setResults] = useState([])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const search = (e) => {
        e.preventDefault()
        searchFdc(searchTerm)
        .then(res => {
            setResults(res.data)
        })
        .catch(err => console.log(err.response))
    }

  return (
    <div>
        <form onSubmit={search}>
            <input id='search' type='search' placeholder='Meal Search' onChange={handleSearch}></input>
            <button type='submit'>Search</button>
        </form>
        <Button />
        <button className="btn-success">Test</button>
        <br />
        {JSON.stringify(results)}
    </div>
  )

}

export default AddMeal