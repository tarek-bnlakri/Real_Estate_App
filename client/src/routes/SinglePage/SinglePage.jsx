import React,{useState} from 'react'
import "./SinglePage.scss"
import {apiRequest} from '../../lib/apiRequest'
import Slider from '../../components/Slider/Slider'
import Map from '../../components/Map/Map'
import { useLoaderData } from 'react-router-dom'
import DOMPurify from 'dompurify'


function SinglePage() {
  const data=useLoaderData()
  const {isSaved}=data
  const [saved, setSaved] = useState(isSaved)
  
  console.log(data,isSaved)
  const savedPost=async()=>{
    setSaved(prev=>!prev)
    try {
        const res= await apiRequest.post('/user/save',{postId:data.id})
        console.log(res)
    } catch (error) {
     console.log(error) 
     setSaved(prev=>!prev)
    }
      
  }
  return (
    <div className='singlePage'>
      <div className='details'>
        <div className="wrapper">
          <Slider data={data}/>
          <div className='infoPost'>
            <div className="left">
              <h1 className='title'>{data.title}</h1>
              <p className='adr'><img src='/pin.png'/>{data.address}</p>
              <p className='price'>${data.price}</p>
            </div>
            <div className="ownerInfo">
              <img src={data.user.avatar} alt="" />
              <p className='ownerName'>{data.user.username}</p>
            </div>
          </div>
          <div className='descrPost' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.postdetail.desc)}}></div>

        </div>
        
      </div>
    <div className='features'>
      <div className="wrapper">
          <div className="general">
            <h1>General</h1>
            <div className='boxes'>
              <div className="box">
                <img src="/utility.png" alt="" />
                <p>
                  <span>Utilities</span>
                  <span>{data.postdetail.utilities==="owner"?"owner is responsible":data.postdetail.utilities==="tenant"?"tenant is responsible":data.postdetail.utilities} </span>
                </p>
              </div>
              <div className="box">
                <img src="/pet.png" alt="" />
                <p>
                  <span>Pet Policy</span>
                  <span>pets {data.postdetail.pet} </span>
                </p>
              </div>
              <div className="box">
                <img src="/fee.png" alt="" />
                <p>
                  <span>Income Policy</span>
                  <span>{data.postdetail.income}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="Sizes">
            <h1>Sizes</h1>
            <div className='boxes'>
              <div className="box">
                <img src="/size.png" alt="" />
                  <span>{data.postdetail.size} sqft</span>
              </div>
              <div className="box">
                <img src="/bed.png" alt="" />
                  <span>{data.bedroom} beds</span>
              </div>
              <div className="box">
                <img src="/bath.png" alt="" />
                  <span>{data.bathroom} bathroom</span>                 
              </div>
            </div>
          </div>
          <div className="nearbyPlaces">
            <h1>Nearby Places</h1>
            <div className='boxes'>
              <div className="box">
                <img src="/school.png" alt="" />
                <p>
                  <span>School</span>
                  <span>{data.postdetail.school} away</span>
                </p>
              </div>
              <div className="box">
                <img src="/bus.png" alt="" />
                <p>
                  <span>Bus Stop</span>
                  <span>{data.postdetail.bus} away</span>
                </p>
              </div>
              <div className="box">
                <img src="/restaurant.png" alt="" />
                <p>
                  <span>Restaurant</span>
                  <span>{data.postdetail.restaurent} away</span>
                </p>                 
              </div>
            </div>
          </div>
          <div className="map">
            <h1>Location</h1>
            <Map items={[data]}/>
          </div>
          <div className='buttonContainer'>
            <button><img src="/chat.png" alt="" /> Send a Message</button>
           
            <button onClick={savedPost} style={saved?{backgroundColor:"yellow"}:{}}><img src='/save.png'/>{saved?"Unsave the place":"Save The Place"}</button>
            
            
          </div>
      </div>
    </div>
    
    </div>
  )
}

export default SinglePage