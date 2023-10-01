import React, { useEffect, useState } from "react";
import axios from "axios";
import imgcloud from "./Images/cloud-removebg-preview.png";
import partly from "./Images/partly-removebg-preview.png";
import weather from "./Images/MostlyCloudyDayV2.svg";
import visibility from "./Images/cost-visibility.png";
import search from "./Images/search-interface-symbol.png";
import "./App.css"
function App (){

  const [weatherData,setWeatherData]=useState({});
  const[city, setCity]=useState("pune");
  const [weatherDescription, setweatherDescription]=useState("")

  async function loadweatherData(){

   try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb784b4375a60ffdd755405e28b612f0`)
    setWeatherData(response.data);
   } catch (error) {
    console.log(error)
   }

  
  }
  useEffect(()=>{
    loadweatherData();
  },[])

  useEffect(()=>{
    loadweatherData();
  },[city])

  useEffect(()=>{
  
     setweatherDescription( `${weatherData?.weather?.[0]?.main }(${weatherData?.weather?.[0]?.description})`)

  },[weatherData])
  return(
    
    <div>
   
          <h1 className="heading">weather </h1>
          <div className="main-container" >
            <div className="img-div">
          <img src={imgcloud} className="cloudimg"/>
          </div>
          <div className="searchbar">
     <input type="text" value={city} onChange={(e)=>{
        setCity(e.target.value);
      }} className="input-box" /><img src={search} className="search-bar"/>
      </div>
     </div>
 <div className="container">
 <div><p className="city">City : {(weatherData?.name)}<br/><br/><br/><img src={partly} className="img"/></p></div>
      <div><p className="temperature">{(weatherData?.main?.temp - 273).toFixed(2)}°C</p></div>
     <div className="description-div"><p >Partly cloud :{weatherDescription}<br/><br/><br/><img src={weather} className="img"/></p></div>
     <div className="visibility-div"><p>Visibility : {weatherData?.visibility}<br/><br/><br/> <img src={visibility} className="img"/></p></div>
  
    </div>
 </div>
  )
}
export default App