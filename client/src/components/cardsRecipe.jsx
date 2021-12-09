import React from "react";
import './css/cardsRecipe.css'

//renderizado de las cards para las recetas
export default function Card({image, name, diet}) {
    return(
        <div className='card'>
            <h4>{name}</h4>
            <img src={image} alt="foto no encontrada"/>
            <h6>{diet}</h6>
        </div>
    );
}