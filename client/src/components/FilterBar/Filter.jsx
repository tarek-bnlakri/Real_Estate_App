import React,{useState} from 'react'
import "./Filter.scss"
import {useSearchParams} from 'react-router-dom'

function Filter() {
    const [searchParams,setSearchParams] =useSearchParams()
   
    const [query, setQuery] = useState({
        city:searchParams.get('city') ||"",
        type:searchParams.get('type') ||"",
        property:searchParams.get('property') ||"",
        minPrice:searchParams.get('minPrice') ||0,
        maxPrice:searchParams.get('maxPrice') ||100000,
        bedroom:searchParams.get('bedroom') ||1,

    })
    console.log(query)
    const handleChangeInputs=(e)=>{
        setQuery(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleClick=()=>{
        setSearchParams(query)
    }
  return (
    <div className='filter'>
        <h2>Search results for <b>{searchParams.get('city')}</b></h2>
        <div className='inputContainer'>
            <div className='top'>
                <label htmlFor='location'>Location</label>
                <input defaultValue={query.city} onChange={handleChangeInputs} name='city' type="text" id='location' />
            </div>
            <div className='bottom'>

                <div className="box">
                    <label htmlFor="type">Type</label>
                    <select defaultValue={query.type} onChange={handleChangeInputs} id='type' name='type' type="text" >
                        <option value="">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>

                <div className="box">
                    <label  htmlFor="property">Property</label>
                    <select defaultValue={query.properity} onChange={handleChangeInputs} name='properity' id='property' type="text">
                        <option value="">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>

                <div className="box">
                    <label htmlFor="minPrice">Min Price</label>
                    <input defaultValue={query.minPrice} onChange={handleChangeInputs} name='minPrice' placeholder='any' id='minPrice' type="number" />
                </div>

                <div className="box">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input defaultValue={query.maxPrice} onChange={handleChangeInputs} name='maxPrice' placeholder='any' id='maxPrice' type="number" />
                </div>

                <div className="box">
                    <label htmlFor="Bedroom">Bedroom</label>
                    <input defaultValue={query.bedroom} onChange={handleChangeInputs} name='bedroom' placeholder='any' id='Bedroom' type="number" />
                </div>
                    <button onClick={handleClick}>
                        <img src="/search.png" alt="" />
                    </button>
            </div>

        </div>
    </div>
  )
}

export default Filter