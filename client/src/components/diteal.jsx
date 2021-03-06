import React from "react";
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetail } from "../actions";
import NavBar from "./navbar";
import './css/diteal.css'

export default function Detail(props){
    const dispatch = useDispatch()
    const {id} = useParams()
    // const [rId, setId] = useState(id)

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

    const myRecipe = useSelector(state => state.detail)

    // console.log(myRecipe, 'recetas')

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className='detaails'>
                <div className='contDt'>
                    {
                        myRecipe.length > 0 ?
                        <div>
                            <h1>{myRecipe[0].title ? myRecipe[0].title : myRecipe[0].name}</h1>
                            <img src={myRecipe[0].img ? myRecipe[0].img :null} alt="no se encontro iagen"/>  
                            <div className='art'>
                                <h5>Tipo de dietas:</h5>
                                <h2>{ myRecipe[0].diets ? myRecipe[0].diets.map(t =>t.name) : myRecipe[0].diets}</h2>
                            </div>
                            <div className='art'>
                                <h5>Puntaje:</h5>
                                <h2>{myRecipe[0].spoonacularScore}</h2>
                            </div>
                            {/* <div className='art'>
                                <h5>Tipo de plato:</h5>
                                <h3>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes.map(d => d.name) :'dish type not found'  }</h3>
                            </div> */}
                            <div className='art'>
                                <h5>Resumen:</h5>
                                <h3>{myRecipe[0].summary}</h3>
                            </div>
                            <div className='art'>
                                <h5>Puntaje Saludable:</h5>
                                <h2>{myRecipe[0].Score}</h2>
                            </div>
                            <div className='art'>
                                <h5>Paso a Paso:</h5>
                                <h4>{ Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.steps.map(f => f.step)) : myRecipe[0].steps }</h4>
                            </div> 
                        </div> : <p>...Loading...</p>
                    }
                    <Link to='/home'>
                        <button>HOME</button>
                    </Link>

                </div>
            </div>
        </div>
        
    )
}