import { useEffect,useState } from "react"
import { NavLink } from "react-router-dom"
import useFetch from "./useFetch"
import plus from './images/add.png'
import minnus from './images/subtract.png'
import GalleryViewer from "./GalleryViewer"

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

const Cart = (props) => {
  const[data,...others]=useFetch(query)
  const[ddata,setData]=useState(null)
  const[Tprice,setPrice]=useState(null)
  
 let array =props.marker
 let numberman = 0
 props.caty('none')
 console.log(others)
 useEffect(()=>{
  if(data){
    setData(data.categories[0].products)
  }
  setPrice(numberman.toFixed(2))
 },[props.marker,data,ddata,numberman,props.symbol])

 function Price(cross){
  if(props.symbol){
    switch(props.symbol){
      case '$':
        return(`${cross.prices[0].currency.symbol} ${cross.prices[0].amount}`)
    
      case '£':
        return(`${cross.prices[1].currency.symbol} ${cross.prices[1].amount}`)
    
      case 'A$':
        return(`${cross.prices[2].currency.symbol} ${cross.prices[2].amount}`)
    
      case '¥':
        return(`${cross.prices[3].currency.symbol} ${cross.prices[3].amount}`)
    
      case '₽':
        return(`${cross.prices[4].currency.symbol} ${cross.prices[4].amount}`)
    
        default:
          break;
  }}
}
 


function replay(){
  if(ddata){
    return(
      <main>
        { ddata.map((content)=>{
          return(
            array.map((value,index )=>{
            if(content.id === value.id){
              Pricage(content,value.quantity)
             return(
               <div key={index} className="map">
                  <hr></hr>
                  <span   onClick={()=>{
                  props.marker.splice(index,1)
                  props.setMarker([...props.marker])
                }} className="spa"><i className="fa fa-times" aria-hidden="true"></i></span>
                <section className="roller">
                <aside>
                  <p className="head">{content.brand} </p>
                  <p className="header">{content.name}</p>
                  <p style={{display:'inline-block'}} className="pprice">{Price(content)}</p>
                  {content.attributes.map((attrb)=>{
                    if(attrb.id ==='Color'){
                      return(
                        <>
                          <p className="cati">{attrb.id}</p>
                          <section>{attrb.items.map((color)=>{
                            let leaf = null
                            value.attributes.map((cath)=>{
                              if(color.value === cath){
                                leaf =color.value
                              }
                              return(<></>)
                          })
                            
                                
                              if(color.value === leaf){
                                return(
                                  <span className="spanx" style= {{backgroundColor:color.value ,border:'2px solid rgba(94, 206, 123, 1)'}}></span>
                                )
                            }
                            else{
                             return(<span className="spanx" style={{backgroundColor:color.value}}></span>)
                            }
                            
                            
                          })}</section>
                        </>
                      )
                    }
                    else{
                      return(
                        <>
                        <p className="cati">{attrb.id}</p>
                        <section>{attrb.items.map((contentx)=>{
                          let leaf = null;
                          value.attributes.map((inside)=>{
                              if(contentx.value ===inside){
                                leaf =inside
                                return(<span></span>)
                              }
                            })
                          
                            if(contentx.value ===leaf){
                              return(
                                <span className="spanner" style={{color:'white',backgroundColor:'rgb(56, 46, 46)',display:'inline-block'}} >{contentx.value}</span>
                              )
                            }
                            else {
                              return(
                                <span style={{display:'inline-block'}} className="spanner">{contentx.value}</span>
                              )
                            }
                          

                        })}</section>
                        </>
                      )
                    }
                  })}
                </aside>
                <article className="cool">
                    <div>
                      <img style={{opacity:props.black}} className="mirror" onClick={()=>{
                        if(value.quantity > 0){
                        value.quantity= value.quantity + 1
                        props.setMarker([...props.marker])}
                      }} src={plus} alt="add" />
                      <span>{value.quantity}</span>
                      <img style={{opacity:props.black}} onClick={()=>{
                        if(value.quantity > 1){
                        value.quantity= value.quantity - 1
                        props.setMarker([...props.marker])}
                      }} className="mirror" src={minnus} alt="subtract" />
                    </div>
                    <GalleryViewer black = {props.black} array = {content.gallery}/>
                  </article>
                  </section>
              </div>
              
              )
          }
        })
          )
      }
      )}
      </main>
    )
}
 }

 function killstyle(){
  props.flex('none')
  props.stylez('none')
  props.app('white')
  props.setBlack('1')
 }

 function Pricage(content,quantity){
  switch(props.symbol){
    case '$':
      numberman =numberman +(content.prices[0].amount * quantity)
      break;
    case '£':
      
      numberman= numberman +(content.prices[1].amount * quantity)
      break;
    case 'A$':
      
      numberman = numberman +(content.prices[2].amount * quantity)
      break;
    case '¥':
       numberman = numberman +(content.prices[3].amount * quantity)
      break;
    case '₽':
     numberman = numberman+(content.prices[4].amount * quantity)
      break;
      default:
        break;
  }
}
  return (
    <div onClick={killstyle}  className='main-cart'>
      <h2>CART </h2>
      {ddata && replay()}
     
      <footer>
        <hr />
       <p>Tax 21%: <span>{props.symbol} {(Tprice *0.21).toFixed(2)}</span></p>
       <p> Quantity: <span>{props.order}</span></p>
       <p>Total: <span>{props.symbol} {Tprice}</span></p>
       <NavLink  className='button'to='/' onClick={()=>{
        props.setMarker([])
        localStorage.removeItem('shop');
       }}> ORDER</NavLink>
      </footer>
    </div>
  )
}

export default Cart