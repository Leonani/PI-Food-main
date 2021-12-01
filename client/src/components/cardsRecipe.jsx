import React from "react";

//renderizado de las cards para las recetas
export default function Cards({image, name, diet}) {
    return(
        <div>
            <img src={image} alt="foto no encontrada"/>
            <h3>{name}</h3>
            <h6>{diet}</h6>
        </div>
    );
}