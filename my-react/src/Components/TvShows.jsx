import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from "axios"
import {AiFillPlayCircle} from "react-icons/ai"
import {AiOutlineClose} from "react-icons/ai"
import NoImg from "./no-image.jpg"
import {Container} from "./NavBar"
import "../Styles/Videos.css"
import TrailerTvShows from '../Trailers/TrailerTvShows'
function TvShows() {
  const {toggle, inputValue} = useContext(Container)
  const input = inputValue
  const [showData, setShowData]= useState([])
  const [trailer, setTrailer] = useState(true)
  const Shown = input ? "search" :  "discover"
  const [title, setTitle] = useState("")
  const Api =`https://api.themoviedb.org/3/${Shown}/tv`
  const Images = "https://image.tmdb.org/t/p/w500/"

  const TvShows = async () =>{
    const data = await axios.get(Api,{
      params:{
        api_key:"1c7b8beaf2f2161dc71febc5f88084bf",
        query: input
      }
    })
    const results = (data.data.results)
    setShowData(results)
   
  }
  useEffect (()=>{
    setTimeout(()=>{
      TvShows()
    }, 100)
  },[input])

   console.log(showData)
   const TvShowTitle = (shows)=>{
    setTitle(shows.name)
    setTrailer(!trailer)
   }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor": "SecondaryBgColor"}>
      <div className='movies-container'>
      {showData.map((shows) =>{
        return(
          <Fragment  key={shows.id}>
            <div id={trailer ? "container" : "NoContainer"}>
             <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={()=> TvShowTitle(shows)}/>
             <img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImg} alt=''onClick={()=> TvShowTitle(shows)}/>
             <h3 className={toggle ? "DarkTheme" : "LightThemeClose"} id={shows.name.length > 28 ? "smaller-Text" : ""}>{shows.name}</h3>
            </div>
          </Fragment>
        )
      })}
      {trailer ?  console.log : <TrailerTvShows TvShowsTitle={title} toggle={toggle}/>}
      <AiOutlineClose id={trailer ? "Nothing" : "Exit1" } className={toggle ? "DarkTheme" : "LightThemeClose"} color='#fff' fontSize={40} onClick={()=> setTrailer(true)}/>
      </div>
      </div>
    </Fragment>
  )
}

export default TvShows