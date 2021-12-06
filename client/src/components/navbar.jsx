import React from 'react'
import { Link } from 'react-router-dom'
import '../components/css/navbar.css'

import logo from'../img/logo.png'
export default function NavBar() {


    return (
        <div className="nav">
            <div className="logo">
                <img src={logo} alt="" />
            </div>    
            <div className='title'>
                    <h1>PI-FOOD</h1> 
            </div>
            <div className='botoncitos'>
                <ul>
                    <Link to='/'><li><button className='bth'>Landing</button></li></Link>    
                    <Link to='/home'><li><button className='bth'>Home</button></li></Link>
                    <Link to= '/recipes'><li><button className='btc'>Crear receta</button></li></Link>
                </ul>
            </div>
        </div>
    )
}

