import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Testimonials from './Components/Testimonials';
import React from 'react';
import { useState } from 'react';
import Cart from './Components/Cart';
import { createContext } from 'react';

export const Context = createContext([]);

function App() { 
 

  // useEffect(() => {
  //   console.log('CURRENT CART FROM APP.JS' + cart) ;
  // },[cart])
  const [cart,setCart] = useState([]);
 
  return (
    <Context.Provider value={[cart,setCart]}>
      <div className="App">
        <Hero />
        {/* <Testimonials /> */}
        {/* <Footer /> */}
      </div>
    </Context.Provider>
  );
}

export default App;
