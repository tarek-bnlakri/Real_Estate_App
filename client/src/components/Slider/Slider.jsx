import React ,{useState}from 'react'
import './Slider.scss'

function Slider({data}) {
  const [image, setImage] = useState(null)
  function handleClickImage(index){
    console.log(image)
    setImage(index)
  }
  return (
  
      <div className='imageContainer'>

          <div className={image===0||image>0?"slider active":"slider"}>
                <div onClick={()=>setImage(-1)} className="exit">
                  X
                </div>
              <div className='arrow'>
                  <img onClick={()=>setImage(prev=>prev===0?data.imges.length-1:prev-1)} src="/arrow.png"alt="" />
              </div>
              <div className='image'>
                 <img  src={data.imges[image]} alt="" />
              </div>
              <div  className='arrow right'>
                < img onClick={()=>setImage(prev=>prev===data.imges.length-1?0:prev+1)} src="/arrow.png" alt="" />
              </div>

          </div>

            <div className='mainImage'>
              <img onClick={()=>handleClickImage(0)} src={data.imges[0]} alt="" />
            </div>
            <div className='secondaryImages'>
              {data.imges.map((img,index)=>index >0 &&<img onClick={()=>handleClickImage(index)} src={img} key={index}/>)}
            </div>
      </div>
   
  )
}

export default Slider