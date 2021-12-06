import React from "react";
import './css/cardsRecipe.css'

//renderizado de las cards para las recetas
export default function Card({image, name, diet}) {
    return(
        <div className='card'>
            <img src={image} alt="foto no encontrada"/>
            <h3>{name}</h3>
            <h6>{diet}</h6>
        </div>
    );
}