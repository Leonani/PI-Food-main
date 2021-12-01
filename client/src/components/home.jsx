import React, { Fragment } from "react"  
import {useState, useEffect} from 'react'
//hooks
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes} from '../actions/index'
import {Link} from 'react-router-dom'
import Cards from "./cardsRecipe"

export default function Home(){
    const dispatch = useDispatch(); // para usar la constante y despachar las acciones
    const allRecipes = useSelector((state) => state.recipes); // traigo todo lo que esta en el estado de redipes
    
    //traigo del estado las recetas cuando el componente se monta
    useEffect(() => {
        dispatch(getRecipes());
    },[dispatch])   //este array es para que no sea infinito

   

    //creo evento para botones
    function handleClick(e){

        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes()); //recetea
    }
    //renderizo
    return(
        <div>
            <Link to= '/recipes'>Crear receta</Link>
            <h1>botoncito</h1>
            <button onClick= {e => {handleClick(e)}}></button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="glu">gluten free</option>
                    <option value="free">dairy free</option>
                    <option value="paleo">paleolithic</option>
                    <option value="lacto">lacto ovo vegetarian</option>
                    <option value="pri">primal</option>
                    <option value="veg">vegan</option>
                    <option value="dai">dairy free</option>                    
                </select>
                <select>
                    <option value="todas">Todas las Recetas</option>
                    <option value="crea">Recetas Creadas</option>
                    <option value="api">Recetas Api</option>
                </select>
                {
                    allRecipes?.map((leo) => {
                        return (
                            <Fragment>
                                <Link to={'/home/' + leo.id}>
                                    <Cards name={leo.name} image={leo.img} diet={leo.diet} id={leo.id}/>
                                </Link> 
                            </Fragment>
                        );
                    })
                }
            </div>
        </div>
    )
}