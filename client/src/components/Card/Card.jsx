import React from 'react'
import "./Card.scss"
import { Link } from 'react-router-dom'

function Card({item}) {
  return (
    <div className='card'>
      
      <Link to={`/${item.id}`} className='imageContainer'>
        <img src={item.imges[0]} alt="" />
      </Link>
      <div className='textContainer'>
        <Link to={`/${item.id}`}>{item.title}</Link>
        <p className='adr'><img src="/pin.png" alt="" />{item.address}</p>
        <p className='price'>$ {item.price}</p>
        <div className='info'>
          <div className='left'>
            <span><img src='/bed.png'/>{item.bedroom+" "} 
             bedroom</span>
            <span><img src='/bath.png'/>{item.bathroom} bathroom
            </span>
          </div>
          <div className='right'>
            <button><img src="/save.png" alt="" /></button>
            <button><img src="/chat.png" alt="" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card