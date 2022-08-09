
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "./useFetch"

const query =`query{categories{
  products{
    id
    name
    inStock
    gallery
    brand
    description
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

const ProductDevelop = (props) => {
  const[value,...others]=useFetch(query)
  const[array,setArrex]=useState(null)
  const[number,setNumber]=useState(null)
  const[connect,setConnect]=useState(null)
  const[attrb,setAt]=useState([])
  const[identity,setId]=useState('')
  const object = {id:identity,attributes:attrb,quantity:1}
  
  const{id}=useParams()
  const colorme = useRef()
  const textme = useRef()
  const refer = useRef()
  props.caty('none')
  
  useEffect(()=>{
    if(value){
      setArrex(value.categories[0].products)
    }
    if(array){//using this to access specific properties of each products
      array.map((content,index)=>{
        if(id ===content.id){
          setNumber(array[index])
          setId(id)
        }
        if(number){
          setConnect(number.gallery[0])
        }
        else{
        }
        return(<></>)
      })
    }
  },[array,number,value, id])

  function Actions(){
    let decision = true
    if(props.mock.length !== 0){
      props.mock.find((value)=>{
        if((value.id === identity) &&(JSON.stringify(value.attributes) === JSON.stringify(object.attributes))){
          console.log(JSON.stringify(value.attributes))
          console.log(JSON.stringify(object.attributes))
          decision = false
          value.quantity = value.quantity + 1
          const color = document.getElementsByClassName('color')
           for (let i = 0; i < color.length; i++) {
            color[i].style.border = '1px solid black'
          }
          const text = document.getElementsByClassName('text')
          for (let i = 0; i < text.length; i++) {
            text[i].style.color = "black";
            text[i].style.backgroundColor='white'
          }
          props.setMock([...props.mock])
        }
        return(<></>)
      })
      if(decision){
        if(number.attributes.length !== 0 && object.attributes.length === 0){
          const hidden = refer.current
          hidden.setAttribute('id','hidden')
          setTimeout(()=>{hidden.removeAttribute('id')},6000)
        }
        else if(number.attributes.length !== 0 && object.attributes.length !== 0){
          props.setMock([...props.mock,object])
          setAt([])
           const color = document.getElementsByClassName('color')
           for (let i = 0; i < color.length; i++) {
            color[i].style.border = '1px solid black'
          }
          const text = document.getElementsByClassName('text')
          for (let i = 0; i < text.length; i++) {
            text[i].style.color = "black";
            text[i].style.backgroundColor='white'
          }
          
        }
        else if(number.attributes.length === 0 && object.attributes.length === 0){
          props.setMock([...props.mock,object])
        }
      }
  
    }
    else{
      if(number.attributes.length !== 0 && object.attributes.length === 0){
        const hidden = refer.current
        hidden.setAttribute('id','hidden')
        setTimeout(()=>{hidden.removeAttribute('id')},6000)
      }
      else if(number.attributes.length !== 0 && object.attributes.length !== 0){

        props.mock.push(object)
        props.setMock([...props.mock])
        setAt([])
        const color = document.getElementsByClassName('color')
           for (let i = 0; i < color.length; i++) {
            color[i].style.border = '1px solid black'
          }
          const text = document.getElementsByClassName('text')
          for (let i = 0; i < text.length; i++) {
            text[i].style.color = "black";
            text[i].style.backgroundColor='white'
          }
      }
      else if(number.attributes.length === 0 && object.attributes.length === 0){
        props.setMock([...props.mock,object])
      }
      
    }
  }

  function Price(){
    if(props.symbol){
      switch(props.symbol){
        case '$':
          return(`${number.prices[0].currency.symbol} ${number.prices[0].amount}`)
        case '£':
          return(`${number.prices[1].currency.symbol} ${number.prices[1].amount}`)
        case 'A$':
          return(`${number.prices[2].currency.symbol} ${number.prices[2].amount}`)
        case '¥':
          return(`${number.prices[3].currency.symbol} ${number.prices[3].amount}`)
        case '₽':
          return(`${number.prices[4].currency.symbol} ${number.prices[4].amount}`)
          default:
            break;
    }}
  }
  function Display(){
    return(
      <section className="sectioning">
        {number.gallery.map((content,index)=>{
          return(
            <img src={content} style={{opacity:props.black}} key={index} onClick={()=>{setConnect(content)}} alt='check-connection' className="number"></img>
          )
        })
        }
      </section>
    )
  }
  function aside(){
    return(
      <aside className="side">
        <h1>{number.brand}</h1>
        <p className="poty">{number.name}</p>
        <div className="dividend">
          {
            number.attributes.map((content,index)=>{
              if(content.name ==='Color'){
                return(
                  < div key ={index}>
                  <p className="tody">{content.name}</p>
                  <div className="page_info">
                      {content.items.map((value,numb)=>{
                        return(
                          <span key={numb} ref={colorme} coloring={value.value}  onClick={(e)=>{
                            let truthfinder = true
                          if(e.target.style.border ===''){
                            e.target.style.border = '2px solid rgba(94, 206, 123, 1)'
                            
                             setAt([...attrb,value.value])
                             truthfinder = false
                            let elem= e.target
                             let prev = e.target 
                             if(elem !== 'null'){
                                while(elem = elem.nextSibling){
                                  elem.style.border='1px solid black'
                              }}
                              if(prev !=='null'){
                                while(prev = prev.previousSibling){
                                  prev.style.border='1px solid black'
                            }}
                          }
                          else if( e.target.style.border === '2px solid rgb(94, 206, 123)'){
                            e.target.style.border = '1px solid black'
                            attrb.map((content,index)=>{
                              if(content === value.value)
                              attrb.splice(index,1 )
                              setAt([...attrb])
                              truthfinder=false
                              return(<></>)
                            })
                           }
                           else {
                            e.target.style.border = '2px solid rgba(94, 206, 123, 1)'
                            const allow = value.value
                            
                            let elem= e.target
                             let prev = e.target 
                             if(elem !== 'null'){
                                while(elem = elem.nextSibling){
                                  attrb.map((content,index)=>{
                                    let custom =elem.getAttribute('coloring')
                                    if(content === custom){
                                      attrb.splice(index,1,allow)
                                      setAt([...attrb])
                                      truthfinder=false
                                    }
                                    else{
                                    }
                                  })
                                  elem.style.border='1px solid black'
                              }}
                              if(prev !=='null'){
                                while(prev = prev.previousSibling){
                                  attrb.map((content,index)=>{
                                    let custome = prev.getAttribute('coloring')
                                    if(content ===custome){
                                      attrb.splice(index,1,allow)
                                      setAt([...attrb])
                                      truthfinder = false
                                    }
                                    else{
                                    }
                                  })
                                  prev.style.border='1px solid black'
                            }}
                           }
                           truthfinder && setAt([...attrb,value.value])
                          }} className="span color" style={{backgroundColor:value.value}}></span>
                        )
                      })}
                  </div>
                  </div>)
                  }
              else{
                return(
                  <div key ={index}>
                  <p className="tody">{content.name}</p>
                  <div  className="page_info">
                      {content.items.map((value,numb)=>{
                        return(

                          <span ref={textme}  valuation={value.value} onClick={(e)=>{
                           let truthfinder= true
                            if (e.target.style.color === ''){
                               setAt([...attrb,value.value])
                               truthfinder= false
                              e.target.style.color = 'white'
                              e.target.style.backgroundColor='rgb(42, 43, 46)'
                              let elem= e.target
                             let prev = e.target 
                             if(elem !== 'null'){
                                while(elem = elem.nextSibling){
                                  elem.style.color='black'
                                  elem.style.backgroundColor='white'
                              }}
                              if(prev !=='null'){
                                while(prev = prev.previousSibling){
                                  prev.style.color='black'
                                  prev.style.backgroundColor='white'
                            }}
                            }
                           else if(e.target.style.color ==='black'){
                              e.target.style.color = 'white'
                              e.target.style.backgroundColor='rgb(42, 43, 46)'
                              const allow = value.value
                             
                              let elem= e.target
                             let prev = e.target 
                             if(elem !== 'null'){
                                while(elem = elem.nextSibling){
                                  elem.style.color='black'
                                  elem.style.backgroundColor='white'
                                  let trans =elem.getAttribute('valuation')

                                  attrb.map((content,id)=>{
                                    if(content === trans ){
                                      attrb.splice(id,1,allow)
                                      setAt(attrb)
                                      truthfinder= false
                                    }
                                    else{
                                      
                                    }
                                    return(<></>)
                                  })

                              }}
                              if(prev !=='null'){
                                while(prev = prev.previousSibling){
                                  prev.style.color='black'
                                  prev.style.backgroundColor='white'
                                  let trans =prev.getAttribute('valuation')
                                  attrb.map((content,id)=>{
                                    if(content ===trans ){
                                      attrb.splice(id,1,allow)
                                      setAt([...attrb])
                                      truthfinder= false
                                    }
                                    else{
                                    }
                                  })
                            }}
                            }
                            else{
                              e.target.style.color='black'
                              e.target.style.backgroundColor='white'
                              attrb.map((content,index)=>{
                                if(content === value.value){
                                  attrb.splice(index,1)
                                  setAt([...attrb])
                                  truthfinder=false
                                  
                                }
                              })
                              
                            }
                            truthfinder && setAt([...attrb,value.value])
                          }} className="plan text" key={numb}>{value.value}</span>
                        )
                      })}
                  </div>
                  </div>)
              }
              
            })
          }
          
        </div>
        <p className="roboto">Price:</p>
        <p className="pricage">{Price()}</p> 
        <button onClick={()=>{
          Actions(number.id)
        }}>Add To Cart</button>
       {
        <p className="description" dangerouslySetInnerHTML={{__html:number.description}}></p>}
      </aside>
    )
  }
  function killstyle(){
    props.flex('none')
    props.style('none')
    props.app('white')
    props.setBlack('1')
  }
  return (
    <div className="PDP" onClick={killstyle}>
      {number && Display() }
      {number && <img className="big_one" style={{opacity:props.black}} src={connect} alt='check your Connection'></img>}
      {number && aside()}
      <p className="rigor" ref={refer}>Please Select Your Spec For This Product</p>
    </div>
  )
}

export default ProductDevelop