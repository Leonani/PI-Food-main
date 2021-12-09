import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postRecipes, getDiets, getDatabase} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./navbar"
import './css/recipeCreate.css'

function validate(input) {
    let errors = {};
    if(!input.title) {
        errors.title = 'se requiere rellenar la casilla Nombre'
    } else if (!input.typeDiets) {
        errors.typeDiets = 'se requiere elegir alguna opcion en Tipo de dieta'
    }
    return errors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: '',
        typeDiets: [],
        spoonacularScore: 0,
        dishTypes: '',
        summary: '',
        healthScore: 0,
        analyzedInstructions: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        // console.log(input)
    }
    
    function handleSelect(e) {
        // console.log(input.typeDiets, 'soy el imput diets')
        setInput((input) => ({
            ...input,
            typeDiets: [...input.typeDiets, e.target.value],
        }));
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value 
        }))
    }
    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(input, 'sjfskl')
    //     await dispatch(postRecipes(input))
    //     alert('Receta Creada!!')
    //     setInput({
    //         title: '',
    //         typeDiets: [],
    //         spoonacularScore: 0,
    //         dishTypes: '',
    //         summary: '',
    //         healthScore: 0,
    //         analyzedInstructions: []
    //     })
    //     history.push('/home')
    // }
    async function handleSubmit(e){
        e.preventDefault()
        await dispatch(postRecipes(input))
        setInput({
            title: '',
            typeDiets: [],
            spoonacularScore: 0,
            dishTypes: '',
            summary: '',
            healthScore: 0,
            analyzedInstructions: []
        })
        const result = await dispatch(getDatabase())
        console.log(result)
        history.push('/home')
    }

    function handleDelete(e) {
         setInput({
             ...input,
             typeDiets: input.typeDiets.filter(d => d !==e)
         })
    }

    useEffect(() => {
        dispatch(getDiets())        
    },[dispatch])

    console.log()
    return (
        <div>
            <div>
                <NavBar/>
            </div>   
            <div className='createR'>
                <div className='allF'>
                    <h1>Crea tu Receta</h1> 
                    
                    <div className='formulario'>
                        
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className='line'>
                            <label>Nombre:</label>
                            <input type= 'text' value= {input.title} name='title' onChange={e => handleChange(e)}/>
                                {errors.name && (
                                    <p className= 'error'>{errors.name}</p>
                                )}                           
                            </div>
                            {/* ---------------------------------------------------------------- */}
                            <div className='line'>
                            <label>Tipo de dieta:</label>
                            <select onChange={e => handleSelect(e)}>                               
                                {diets?.map(d => (
                                    <option value={d.name}>{d.name}</option>
                                ))}
                           
                            </select>
                            </div> 
                            <div className='line'>
                            <ul><li>{input.typeDiets?.map(el => el + ' ,')}</li></ul>
                            </div>
                            {/* --------------------------------------------------------- */}
                            <div className='line'>
                            <label>Puntaje:</label>
                            <input type= 'number' value={input.spoonacularScore} name='spoonacularScore' onChange={e => handleChange(e)}/> 
                            </div>
                            <div className='line'>
                            <label>Tipo de Plato:</label>
                            <input type= 'text' value={input.dishTypes} name='dishTypes' onChange={e => handleChange(e)}/> 
                            </div>
                            <div className='line'>
                            <label>Resumen:</label>
                            <input type= 'text' value={input.summary} name='summary' onChange={e => handleChange(e)}/> 
                            </div>
                            <div className='line'>
                            <label>Puntaje saludable:</label>
                            <input type= 'Number' value={input.healthScore} name='healthScore' onChange={e => handleChange(e)}/> 
                            </div>
                            <div className='line'>
                            <label>imagen:</label>
                            <input type= 'text' value={input.image} name='image' onChange={e => handleChange(e)}/> 
                            </div>
                            <div className='line'>
                            <label>Paso a paso:</label>
                            {/* <input type= 'text' value={input.analyzedInstructions} name='analyzedInstructions'/>   */}
                            <textarea type= 'text' value={input.analyzedInstructions} name='analyzedInstructions' onChange={e => handleChange(e)}></textarea>
                            </div>
                           
                            <Link to='/home'>
                            <button className='bts' type='submit'>Crear</button>
                            </Link>       
                            
                        
                        </form>
                        {input.typeDiets?.map(el => 
                            <div className='fullElement'>
                                <div className='element'>
                                    <h3>{el}</h3>
                                    <button onClick={() => handleDelete(el)}>X</button> 
                                </div>                                  
                            </div>    
                            )}

                    </div>
                </div>    
            </div>
        </div>
    )

}