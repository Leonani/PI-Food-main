import React from "react";  
import {useSrate, useEffect} from 'react'
//hooks
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes} from '../actions'

export default function Home(){
    const dispatch = useDispatch() // para usar la constante y despachar las acciones
    const allRecipes = useSelector(estate => state.recipes) // traigo todo lo que esta en el estado de redipes

    //traigo del estado las recetas cuando el componente se monta
    useEffect(() => {
        dispatch(getRecipes())

    },[])//este array es para que no sea infinito

    //creo evento para botones
    function handleClick(e){

        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes()); //recetea
    }
    //renderizo
    return(
        <Div>
            <Link to= '/recipes'>Crear receta</Link>
            <h1>botoncito</h1>
            <button onClick= {e => {handleClick(e)}}></button>
            <div>
                <select name="" id="">
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
        </Div>
    )
}