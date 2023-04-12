import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from "axios"
import {AiOutlineClose} from "react-icons/ai"
import {AiFillPlayCircle} from "react-icons/ai"
import {Container} from "./NavBar"
import "../Styles/Videos.css"
import NoImg from "./no-image.jpg"
import TrailerTrending from '../Trailers/TrailerTrending'


function Trends() {
  const {toggle, inputValue} = useContext(Container)
  const Api ="https://api.themoviedb.org/3/"
  const Images = "https://image.tmdb.org/t/p/w500/"
  const TrendsShown = "/trending/all/week"
  const [trendsArray, setTrendArray]= useState([])
  const [trailer, setTrailer] = useState(true)
  const[trendTitle ,setTrendTitle]= useState("")
  const Trends = async() => {
    const data = await axios.get(`${Api}${TrendsShown}`,{
      params:{
        api_key:"1c7b8beaf2f2161dc71febc5f88084bf",
        // query: input
      }
    })
    const results = data.data.results
    setTrendArray(results)
   
  }
  useEffect (()=>{
    setTimeout(()=>{
      Trends()
    }, 100)
    
  },[])
  console.log(trendsArray)

  const TrendTitle = (trend)=>{
    setTrendTitle(trend.title)
    setTrailer(!trailer)
   }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor": "SecondaryBgColor"}>
        <div className='movies-container'>
          {trendsArray.map((trend) => {
            return(
              <Fragment>
              <div id={trailer ? "container" : "NoContainer"}>
                <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon': "hide"} onClick={()=> TrendTitle(trend)}/>
                <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt='' onClick={()=> TrendTitle(trend)}/>
                <h3 className={toggle ? "DarkTheme" : "LightThemeClose"} id="smaller-Text" >{trend.title}</h3>
              </div>
              </Fragment>
            )
          })}
           {trailer ?  console.log : <TrailerTrending trendTitle={trendTitle} toggle={toggle}/>}
          <AiOutlineClose id={trailer ? "Nothing" : "Exit1" } className={toggle ? "DarkTheme" : "LightThemeClose"} color='#fff' fontSize={40} onClick={()=> setTrailer(true)}/>

        </div>
      </div>
      
    </Fragment>
  )
}

export default Trends