import React,{useState} from 'react'
import "./SearchBar.scss"
import {Link} from 'react-router-dom'
function SearchBar() {
  const [query, setQuery] = useState({
    type:"buy",
    city:"",
    minPrice:0,
    maxPrice:0
  })
  
  return (
    <div className='searchBar'>
      
        <div className='type'>
          <button onClick={()=>setQuery(prev=>({...prev,type:"buy"}))} className={query.type==="buy"?"active":""}>Buy</button>
          <button onClick={()=>setQuery(prev=>({...prev,type:"rent"}))} className={query.type==="rent"?"active":""}>Rent</button>
        </div>
        <form>
          <input onChange={(e)=>setQuery(prev=>({...prev,location:e.target.value}))} value={query.location} placeholder='City Location' type="text" name='city' />
          <input onChange={(e)=>setQuery(prev=>({...prev,minPrice:e.target.value}))} value={query.minPrice || ""} placeholder='Min Price' type="number" />
          <input onChange={(e)=>setQuery(prev=>({...prev,maxPrice:e.target.value}))} value={query.maxPrice || ""} placeholder='Max Price' type="number" />
          <Link to={`/list?city=${query.city}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
            <button>
            <img src="/search.png" alt="" />
             </button>
          </Link>
        </form>

    </div>
  )
}

export default SearchBar