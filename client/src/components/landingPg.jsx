import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return(
        <div>
            <Link to = '/home'>
                <button>
                    <h1>Bienvenidos a mi super pagina de comidas!!</h1>
                </button>
            </Link>
        </div>
    )
}