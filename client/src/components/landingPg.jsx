import React from "react";
import {Link} from 'react-router-dom';
import '../components/css/landing.css'

export default function LandingPage() {
    return(
        <div className='wpLanding'>
            <Link className='btb' to = '/home'>
                <button class='btLanding'>
                    <div className='text'>
                    <h1>!!Bienvenido!!</h1>
                    <h2>PI FOOD HENRY</h2>
                    <p>Haz click para empezar!!</p>
                    </div>
                </button>
            </Link>
        </div>
    )
}