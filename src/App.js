import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';
import Cart from './Components/Cart';
import {  useEffect, useRef, useState } from 'react';
import useFetch from './Components/useFetch';
import logo from './images/logo.png'
import cart from './images/empty_cart.png'
import Clothe from './Components/Clothe';
import Tech from './Components/Tech';
import { NavLink } from 'react-router-dom';
import drop from './images/dropdown.png'
import ProductDevelop from './Components/ProductDevelop'
import MiniCart from './Components/MiniCart';
const l_query =`
query{
  categories{
    name
  }
}
`
const currency= `query{
  currencies{
    symbol
    label
  }
}`
function App() {
  const[nav,setNav]=useState(null)
  const[dollar,setDollars]=useState(null)
  const[val]=useFetch(l_query)
  const[money]=useFetch(currency)
  const[options,setOption]=useState('$')
  const[flex,setFlex]=useState()
  const[no_of_order,setNumber]=useState(0)
  const[array,setArray]=useState([])
  const[vip,setVip]=useState(null)
  const[category,setCat]=useState(null)
  const[carter,setCart]=useState(null)
  const[appbg,setBg]=useState(null)
  const[darkmode,setDark]= useState(null)
  const refer = useRef()
  useEffect(()=>{ 
  if(val){
  setNav(val.categories)}
  if(money){
    setDollars(money.currencies)
  }
    if(no_of_order === 0){
      setVip('none')
    }
    else{
      setVip('inline-block')
    }
    if(array.length === 0 && localStorage.getItem('shop')){
      setArray(JSON.parse(localStorage.getItem('shop')))
    }
    else if( array.length !==0){
      localStorage.setItem('shop',JSON.stringify(array))
      let countdown = 0
      array.map((content)=>{
        return(
        countdown = countdown + content.quantity)
      })
      setNumber(countdown)
    }
    else{
      localStorage.setItem('shop',JSON.stringify(array))
      let countdown = 0
      array.map((content)=>{
        return(
        countdown = countdown + content.quantity)
      })
      setNumber(countdown)
    
    }
  
  },[val,money,array,no_of_order]
  )
  
 function navigate(e){
  setFlex('none')
  killstyle()
  const key= e.target
    const action= key.dataset.action
    switch(action){
      case 'all':
        e.target.style.borderBottom='3px solid #5ECE7B'
        e.target.style.color='#5ECE7B'
        const next=e.target.nextElementSibling//chaining this in order to manipulate navigation bar
        next.style.color='black'
        next.style.borderBottom='none'
        const nxt= next.nextElementSibling
        nxt.style.color='black'
        nxt.style.borderBottom='none'
        break;
      case 'clothes':
        e.target.style.borderBottom='3px solid #5ECE7B'
        e.target.style.color='#5ECE7B'
        const previous=e.target.previousElementSibling
        previous.removeAttribute('id')
        previous.style.color='black'
        previous.style.borderBottom='none'
        const forward=e.target.nextElementSibling//chaining this in order to manipulate navigation bar
        forward.style.color='black'
        forward.style.borderBottom='none'
        break;
      case 'tech':
        e.target.style.borderBottom='3px solid #5ECE7B'
        e.target.style.color='#5ECE7B'
        const black=e.target.previousElementSibling
        black.style.color='black'
        black.style.borderBottom='none'
        const dback=black.previousElementSibling
        dback.style.color='black'
        dback.style.borderBottom='none'
        break;
      default:
        break;
    } 
}
function setCurrency(e){
  const key= e.target
  const action= key.dataset.action
  switch(action){
    case '$':
      setOption('$')
      break;
      case '£':
        setOption('£')
        break;
      case 'A$':
        setOption('A$')
        break;
      case '¥':
        setOption('¥')
        break;
      case '₽':
        setOption('₽')
        break;
      default:
        break;
  }

}
const head=refer.current//using this to access sibling element for css reload style
const windowx = window.location.href

if (head){
  const nxt_el= head.nextElementSibling
  const other_el= nxt_el.nextElementSibling
  if(windowx.includes('/clothes')){
    head.removeAttribute('id')
    nxt_el.setAttribute('id','fnav')
    other_el.removeAttribute('id')
    }
  else if (windowx.includes('/tech')){
      head.removeAttribute('id')
       nxt_el.removeAttribute('id')
       other_el.setAttribute('id','fnav')
    }
    else{
         other_el.removeAttribute('id')
         nxt_el.removeAttribute('id')
         head.setAttribute('id','fnav')
    }
 }

  function carting(){
    setFlex('none')
    if(carter==='none' && no_of_order !==0){
      setCart('block')
      setBg('rgba(57, 55, 72, 0.22)')
      setDark('0.6')
    }
    else{
      setCart('none')
      setBg('white')
      setDark('1')
    }
  }
  function killstyle(){
    setCart('none')
    setBg('white')
    setDark('1')
  
  }
  return (
    <BrowserRouter>
      <div className="App" style={{backgroundColor:appbg}}>
        <header>
        {nav &&<nav >
          <div className='div' onClick={navigate}>  
          {nav.map((content,index) =>{
            if(content.name ==='all'){
              return <NavLink data-action={content.name} to='/' className='site' ref={refer} id='fnav'key={index}>{content.name}</NavLink>
            }
            else
           return <NavLink data-action={content.name} to={content.name} className='site' key={index}>{content.name}</NavLink>
          })}
          </div>
          <img onClick={killstyle} className='img' alt='logo' src={logo}></img>
          <aside onClick={killstyle}>
            <span className='pan' onClick={()=>{setFlex('flex');setCart('none')}}>
              {options }  

              <img className='DropD' src={drop} alt="DropDown" />
            </span>
            {dollar && <div style={{display:flex}} className='range' onClick={setCurrency}>{
              dollar.map((content,index)=>{
                return <span onClick={()=>setFlex('none')} className='span' key={index} data-action={content.symbol}>{content.symbol} {content.label} </span>
              })
            }  
            </div>}
          </aside>
          <div className='divx' >
            <div onClick={carting}>
            <img  alt='' src={cart}></img>
            <span className='span' style={{display:vip}}>{no_of_order}</span>
            </div>
            <MiniCart flex={setFlex} setBlack={setDark} black={darkmode} app={setBg} stylez={setCart} number={setNumber} style={carter} marker={array} symbol={options} setMarker={setArray} order={no_of_order} />
          </div>
          </nav>}</header>
          <p style={{display:category}} onClick={()=>{setFlex('none') ;setCart('none');setDark('1');setBg('white')}} className='name'>Category name</p>
        <Routes>
          <Route exact path='/' element= {<Landing setBlack={setDark} black={darkmode} app={setBg} style={setCart} mock={array} setMock={setArray} flex={setFlex} caty={setCat} sign={options}/>}>
          </Route>
          <Route path='/cart' element={<Cart caty={setCat} flex={setFlex} setBlack={setDark} black={darkmode} app={setBg} stylez={setCart} number={setNumber} style={carter} marker={array} symbol={options} setMarker={setArray} order={no_of_order} />}></Route>
          <Route path='/clothes' element={<Clothe setBlack={setDark} black={darkmode} app={setBg} style={setCart} mock={array} setMock={setArray} flex={setFlex} caty={setCat} sign={options} />}></Route>
          <Route path='/tech'  element={<Tech setBlack={setDark} black={darkmode} app={setBg} style={setCart} mock={array} setMock={setArray} flex={setFlex} caty={setCat} sign={options}/>}></Route>
          <Route path='/:category/:id' element={<ProductDevelop flex={setFlex} setBlack={setDark} black={darkmode} app={setBg} style={setCart} mock={array} setMock={setArray} order={setNumber} symbol={options} caty={setCat} />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
