import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postRecipes, getDiets, getDatabase} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./navbar"
import './css/recipeCreate.css'

function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'se requiere rellenar la casilla Nombre'
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
        name: '',
        summary: '',
        Score: 0,            
        healthScore: 0,
        image:'https://images.ecestaticos.com/kur2mmU6fiXX571utnIfe5RskMY=/0x0:0x0/1200x899/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ffa4%2F2bd%2F398%2Ffa42bd398ffcbc07efc40870b6436f87.jpg',
        steps: [],
        diets: [],
        createdINBd: true
    })

    function handleChange(e) {
        // console.log(e)
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
            diets: [...input.diets, e.target.value],
        }));
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value 
        }))
    }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log( 'hola')
    //     await dispatch(postRecipes(input))
    //     alert('Receta Creada!!')
    //     setInput({
    //             title: '',
    //         typeDiets: [],
    //         spoonacularScore: 0,
    //         dishTypes: '',
    //         summary: '',
    //         healthScore: 0,
    //         analyzedInstructions: []
    //     })
    //     history.push('/home')
    // }

    // console.log(input, 'arriba submit')
    async function handleSubmit(e){
        // console.log(input,'algho')
        e.preventDefault()
        await dispatch(postRecipes(input))
        // ame,
        // summary,
        // score,
        // healthScore,
        // image,
        // steps,
        // diets,
        // createdINBd
        setInput({
            name: '',
            summary: '',
            Score: 0,            
            healthScore: 0,
            image:'',
            steps: [],
            diets: [],
        })
        const result = await dispatch(getDatabase())
        console.log(result)
        history.push('/home')
    }

    function handleDelete(e) {
         setInput({
             ...input,
             diets: input.diets.filter(d => d !==e)
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
                            <input type= 'text' value= {input.name} name='name' onChange={e => handleChange(e)}/>
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
                            <ul><li>{input.diets?.map(el => el + ', ')}</li></ul>
                            </div>
                            {/* --------------------------------------------------------- */}
                            <div className='line'>
                            <label>Puntaje:</label>
                            <input type= 'number' value={input.Score} name='Score' onChange={e => handleChange(e)}/> 
                            </div>
                            {/* <div className='line'>
                            <label>Tipo de Plato:</label>
                            <input type= 'text' value={input.dishTypes} name='dishTypes' onChange={e => handleChange(e)}/> 
                            </div> */}
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
                            <textarea type= 'text' value={input.steps} name='steps' onChange={e => handleChange(e)}></textarea>
                            </div>
                           
                            
                            <button className='bts' type='submit'>Crear</button>
                                  
                            
                        
                        </form>
                        {input.diets?.map(el => 
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