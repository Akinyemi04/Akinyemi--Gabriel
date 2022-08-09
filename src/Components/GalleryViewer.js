import { useState } from "react"
import left from './images/left.png'
import right from './images/right.png'
const GalleryViewer = (props) => {

    const[roll,setRoll]= useState(0)
  if (props.array.length === 1){
    return(
        <img  style={{opacity:props.black}} className="large-one" src={props.array[0]} alt="lil" />
    )
  } 
  else{
    return(
        <>
      <div  className="control">
        
        <img onClick={()=>{
          if(roll > 0 ){
            setRoll(roll -1)
          }
        }} className="move" alt='up' src={left}/>
        <img onClick={()=>{
          if (roll > -1  && roll < props.array.length-1){
            setRoll(roll +1)
          } 
        }
        } className="move right" alt='down ' src={right}/>

        </div>
      <img  style={{opacity:props.black}} className="large-one" src={props.array[roll]} alt="lil" />
    </>
    )
  }
  
}

export default GalleryViewer