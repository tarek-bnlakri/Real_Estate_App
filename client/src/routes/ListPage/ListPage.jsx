import "./ListPage.scss";
import React, { Suspense } from 'react'
import Filter from "../../components/FilterBar/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import { useLoaderData,Await } from "react-router-dom";

function ListPage() {
 const data=useLoaderData()
  
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
         <Filter/>
        <Suspense fallback={<p>Loading....</p>}> 
          <Await
            resolve={data.postResponce}
            errorElement={
              <p>Error loading package location!</p>
            }
          >
          {(postResponse) => (
            postResponse.data.map(item => (
              <Card key={item.id} item={item} />
          ))
          )}
          </Await>
        </Suspense>
        </div>
      </div>
      <div className="mapContainer">
      <Suspense fallback={<p>Loading....</p>}> 
          <Await
            resolve={data.postResponce}
            errorElement={
              <p>Error loading package location!</p>
            }
          >
          {(postResponse) => (
           
              <Map items={postResponse.data}/>
         
          )}
          </Await>
        </Suspense>
        
      </div>
    </div>
  )
}

export default ListPage