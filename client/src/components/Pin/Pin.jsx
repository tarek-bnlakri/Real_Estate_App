import React from 'react'
import './Pin.scss'
import { Marker,Popup } from 'react-leaflet'
import { Link } from "react-router-dom";

function Pin({item}) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
        <Popup>
            <div className='container'>
                <div className='imageContainer'>
                        <img src={item.img}/>
                </div>
                <div className='textContainer'>
                <Link to={`/${item.id}`}>{item.title}</Link>
                        <p>{item.bedroom}bedroom</p>
                        <p>$ {item.price}</p>
                </div>
            </div>
        </Popup>
    </Marker>
  )
}

export default Pin