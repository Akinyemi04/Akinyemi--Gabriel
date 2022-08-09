import { useEffect,useState } from "react"
import { NavLink } from "react-router-dom"
import useFetch from "./useFetch"
import plus from './images/add.png'
import minnus from './images/subtract.png'

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

const MiniCart = (props) => {
  const[data,...others]=useFetch(query)
  const[ddata,setData]=useState(null)
  const[Tprice,setPrice]=useState(null)
 let array =props.marker
 let numberman = 0
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
  }
  
  }
}
 
 function replay(){
  if(ddata){
    return(
      <main>
        { ddata.map((content)=>{
          return(
            array.map((value,index)=>{
          if(content.id === value.id){
            Pricage(content,value.quantity)
            return(
              <div key={index} className="map">
                <span   onClick={()=>{
                  props.marker.splice(index,1)
                  props.setMarker([...props.marker])
                }} className="spa"><i className="fa fa-times" aria-hidden="true"></i></span>
                <aside>
                  <p className="head">{content.brand} </p>
                  <p className="head">{content.name}</p>
                  <p style={{display:'inline-block'}} className="pprice">{Price(content)}</p>
                  <article className="cool">
                    <div>
                      <img className="mirror" onClick={()=>{
                        if(value.quantity > 0){
                        value.quantity= value.quantity + 1
                        props.setMarker([...props.marker])}
                      }} src={plus} alt="add" />
                      <span>{value.quantity}</span>
                      <img onClick={()=>{
                        if(value.quantity > 1){
                        value.quantity= value.quantity - 1
                        props.setMarker([...props.marker])}
                      }} className="mirror" src={minnus} alt="subtract" />
                    </div>
                    <img className="large-one" src={content.gallery[0]} alt="lil" />
                  </article>
                  {content.attributes.map((attrb,numz)=>{
                    if(attrb.id ==='Color'){
                      return(
                        < div key={numz}>
                          <p className="cati">{attrb.id}</p>
                          <section>{attrb.items.map((color,namz)=>{
                            let leaf = null
                            value.attributes.map((cath)=>{
                              if(color.value === cath){
                                leaf =color.value
                              }
                              return(<></>)
                          })
                            
                                
                              if(color.value === leaf){
                                return(
                                  <span key={namz} className="spanx" style= {{backgroundColor:color.value ,border:'2px solid rgba(94, 206, 123, 1)'}}></span>
                                )
                            }
                            else{
                             return(<span key={namz}  className="spanx" style={{backgroundColor:color.value}}></span>)
                            }
                            
                            
                          })}</section>
                        </div>
                      )
                    }
                    else{
                      return(
                        <div key={numz}>
                        <p className="cati">{attrb.id}</p>
                        <section>{attrb.items.map((contentx,index)=>{
                          let leaf = null;
                          value.attributes.map((inside)=>{
                              if(contentx.value ===inside){
                                leaf =inside
                              }
                              return(<></>)
                            })
                          
                            if(contentx.value ===leaf){
                              return(
                                <span key={index} className="spanner" style={{color:'white',backgroundColor:'rgb(56, 46, 46)',display:'inline-block'}} >{contentx.value}</span>
                              )
                            }
                            else {
                              return(
                                <span key={index} style={{display:'inline-block'}} className="spanner">{contentx.value}</span>
                              )
                            }
                          

                        })}</section>
                        </div>
                      )
                    }
                  })}
                </aside>
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
    <div onClick={(e)=>{e.target.style.display='block'}} style={{display:props.style}} className='mini-cart'>
      <h2>MY BAG </h2>
      <p className="prep"> . {props.order} items</p>
      
      {ddata && replay()}
      <div className="feet">
        <span className="total"> Total: </span>
        <span className="speed">{props.symbol} {Tprice}</span>
      </div>
        
      <footer>
        <NavLink to='/cart' onClick={killstyle} className="view-bag"> VIEW BAG </NavLink>
        <button className="checkout" onClick={()=>{
          props.number(0)
          props.setMarker([])
          localStorage.removeItem('shop');
          killstyle()
        }}>CHECK-OUT</button>
      </footer>
    </div>
  )
}

export default MiniCart
