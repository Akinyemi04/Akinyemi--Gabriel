
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useFetch from './useFetch'
import click from './images/click-cart.png'

const query =`query{categories{
  products{
    id
    name
    inStock
    gallery
    brand
    attributes{
      id
      name
      type
      items{
        displayValue
        value
        id
      }
    }
    prices{
      currency{
        label
        symbol
      }
      amount
    }
  }
}
}`
const Landing = (props) => {
 props.caty('block')
  const[value,setVal]=useState(null)
  const[data,...others]=useFetch(query)
  
  useEffect(()=>{
    if(data){
      setVal(data.categories[0].products)
    }
  },[data])

  console.log(others)
  function setCurrency(money){ //using this function to set prices of the products
    if(props.sign==='$'){
      return (money[0].currency.symbol + money[0].amount)
    }
    else if(props.sign ==='£'){
      return (money[1].currency.symbol + money[1].amount)
    }
    else if(props.sign ==='A$'){
      return (money[2].currency.symbol + money[1].amount)
    }
    else if(props.sign ==='¥'){
      return (money[3].currency.symbol + money[1].amount)
    }
    else{
      return(money[4].currency.symbol + money[1].amount)
    }
  }
 function display(){// using this function to display the products respectively
  return(
    value.map((content,index)=>{
      if(content.inStock){
      return(
      <div  className='product'  key={index}>
        <img alt='no-display' style={{opacity:props.black}} className='image' src={content.gallery[0]}></img>
        <img className='click' alt='cart-me' src={click} onClick={()=>{
          let arrayx=[]
          let object ={id:content.id,attributes:arrayx,quantity:1}
          content.attributes.map((contentx,id)=>{
            arrayx.push(contentx.items[0].value)
          return(<span> </span>)     
          })
          let decision = true

          if(content.attributes.length !== 0){
            props.mock.map((value)=>{
              if((value.id === object.id) &&(JSON.stringify(value.attributes) === JSON.stringify(object.attributes))){
                decision = false
                value.quantity = value.quantity + 1
                props.setMock([...props.mock])
              }
              return(<span></span>)
            })
              if(decision){
                props.mock.push(object)
                   props.setMock([...props.mock])
              }
          }
          else{
            if(props.mock.length ===0){
              props.mock.push(object)
              props.setMock([...props.mock])
            }
            else{
              props.mock.map((value)=>{
                if(value.id === object.id){
                  decision = false
                value.quantity = value.quantity + 1
                props.setMock([...props.mock])
                }
                return(<span></span>)
              })
              if(decision){
                props.mock.push(object)
                props.setMock([...props.mock])
                  
              }
            }
          }
          
        }}></img>
        <NavLink className='linkx' to={`/all/${content.id}`}>
          <p className='brand'>{content.brand} {content.name}</p>
          <p className='price'>{setCurrency(content.prices)}</p>
        </NavLink>
      </div>)
  }
      else{
        return(
          <div className='product' key={index}>
        <img alt='no-display' className='image false' src={content.gallery[0]}></img>
        <p className='brand'>{content.brand} {content.name}</p>
        <p className='brand'>{setCurrency(content.prices)}</p>
        <p className='Nostock'>OUT OF STOCK</p>
      </div>
        )
      }      
})
  )
 }
 function killstyle(){
  props.flex('none')
  props.style('none')
  props.app('white')
  props.setBlack('1')
 }
  return (
    <div className='Home' onClick={killstyle}>
        {value && display()
        }
    </div>
  )
}

export default Landing