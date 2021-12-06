import React from 'react'

export default function Paginado(recipesPg, allRecipes, paginado){
    const pgNumber = [];

    //recorremos el arreglo de numeros por la divicion de math.ceil(redondea)
    for(let i=0; i<=Math.ceil(allRecipes/recipesPg); i++){
        pgNumber.push(i+1);
    }

    return(
        <nav>
            <ul className='paginado'>
                { pgNumber && pgNumber.map(number => (
                    <li className='number' key={number}>
                        <a onClick= {()=> paginado(number)} href>{number}</a>
                    </li>    
                ))}
            </ul>
        </nav>
    )
}
