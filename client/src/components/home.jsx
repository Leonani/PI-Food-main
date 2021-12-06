import React, { Fragment } from "react"  
import {useState, useEffect} from 'react'
//hooks
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filetrRecipesByTypes, filterRecipesByCreated, orderByName} from '../actions/index'
import {Link} from 'react-router-dom'
import Cards from "./cardsRecipe"
import Paginado from "./paginado"
import SearchBar from "./searchBar"
import NavBar from "./navbar"
import './css/home.css'

export default function Home(){
    // para usar la constante y despachar las acciones
    const dispatch = useDispatch(); 
    // traigo todo lo que esta en el reducer los estado de recipes
    const allRecipes = useSelector((state) => state.recipes);   //es lo mismo que hacer  mapStateToProps
    const allDiets = useSelector(state => state.diets)
    //-----------------------------------------------------------

console.log(allDiets)


    //------------------paginado home-----------------------------
    const [orden, setOrden] = useState('');
    //se guarda en una const el estado local y se seteamos la pagina actual y empieza en el paginado 1
    const [currentPg, setCurrentPg] = useState(1);
    //guardo cuantas recetas quiero por pg
    const [recipesPg, setRecipesPg] = useState(9);
    const indexOfLastRecipe = currentPg * recipesPg; //9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPg; //0
    //cortamos el array de recipes para mostar por pg
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
//------------------------------------------------------------


    const paginado = (pgNumber) => {
        setCurrentPg(pgNumber)
    }
    

    //traigo del estado las recetas cuando el componente se monta -- 
    useEffect(() => {
        dispatch(getRecipes());  //hook del matchDispatchToProps()
    },[dispatch])   //este array es para que no sea infinito

   
    //creo evento para botones
    function handleClick(e){

        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes()); //recetea
    }

    function handleFilterTypes(e){
        dispatch(filetrRecipesByTypes(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterRecipesByCreated (e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPg(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    //renderizo
    return(
        <div>
            <NavBar/>
            <div className= 'home'>
                <div className='busqueda'>
                    <div className='lala'>              
                        <Link to= '/recipes'><button className='bt'>Crear receta</button></Link>
                        {/* <h1>botoncito</h1> */}
                        <SearchBar/>
                    </div> 
                    <div className='lala'>
                        <button className='bt' onClick= {e => {handleClick(e)}}>Recargar Recetas</button>
                        <div className='filtros'>
                            <select onChange={e => handleSort(e)}>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                            <select onChange={e => handleFilterTypes(e)}>
                                <option value="All">All recipes</option>
                                <option value="gluten free">Gluten free</option>
                                <option value="dairy free">Dairy free</option>
                                <option value="paleolithic">Paleolithic</option>
                                <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                                <option value="primal">Primal</option>
                                <option value="vegan">Vegan</option>   
                                <option value="lacto-vegetarian">Lacto-Vegetarian </option>   
                                <option value="ketogenic">Ketogenic</option> 
                                <option value="whole 30">Whole 30</option>  
                                <option value="pescatarian">Pescatarian</option>                            
                            </select>
                            <select onChange={e => handleFilterCreated(e)}>
                                <option value="all">Todas las Recetas</option>
                                <option value="created">Recetas Creadas</option>
                                <option value="api">Recetas Api</option>
                            </select>
                        </div>
                    </div>

                    {/* traigo las cruds que necesito para el paginado */}
                    <Paginado 
                    recipesPg= {recipesPg}
                    allRecipes= {allRecipes.length}
                    paginado= {paginado}
                    />

                    {
                        currentRecipes?.map((leo) => {
                            return (
                                <Fragment>
                                    <Link to={'/home/' + leo.id}>
                                        <Cards name={leo.name} image={leo.img ? leo.img : leo.image} diet={leo.diet} id={leo.id}/>
                                    </Link> 
                                </Fragment>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}