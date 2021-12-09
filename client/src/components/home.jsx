  import {useState, useEffect} from 'react'
//hooks
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filetrRecipesByTypes, filterRecipesByCreated, orderByName} from '../actions/index'
import {Link} from 'react-router-dom'


import Paginado from "./paginado"
import SearchBar from "./searchBar"
import NavBar from "./navbar"
import Card from "./cardsRecipe"
import './css/home.css'

export default function Home(){
    // para usar la constante y despachar las acciones
    const dispatch = useDispatch(); 
    // traigo todo lo que esta en el reducer los estado de recipes
    const allRecipes = useSelector((state) => state.recipes);   //es lo mismo que hacer  mapStateToProps
    // const allDiets = useSelector(state => state.diets)
    const diets = useSelector((state) => state.diets)
    //-----------------------------------------------------------


//08106663368 prisma

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
    // console.log(currentRecipes)
   
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
        <div className='all'>
            <NavBar/>
            <div className= 'home'>
                <div className='busqueda'>
                    <div className='lala'>              
                        <Link to= '/recipes'><button className='bt'>Crear receta</button></Link>                        
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
                                {diets.map(d => (
                                    <option value={d.name}>{d.name}</option>
                                ))}
                                {/* <option value="gluten free">Gluten free</option>
                                <option value="dairy free">Dairy free</option>
                                <option value="paleolithic">Paleolithic</option>
                                <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                                <option value="primal">Primal</option>
                                <option value="vegan">Vegan</option>   
                                <option value="lacto-vegetarian">Lacto-Vegetarian </option>   
                                <option value="ketogenic">Ketogenic</option> 
                                <option value="whole 30">Whole 30</option>  
                                <option value="pescatarian">Pescatarian</option>                             */}
                            </select>
                            <select onChange={e => handleFilterCreated(e)}>
                                <option value="all">Todas las Recetas</option>
                                <option value="created">Recetas Creadas</option>
                                <option value="api">Recetas Api</option>
                            </select>
                        </div>
                    </div>            
                </div>
                {/* traigo las cruds que necesito para el paginado */}
                <div class="cards">                         
                    
                    {
                        currentRecipes?.map((leo) => {
                            // console.log(currentRecipes,'home')
                            return (
                                <div id='Allcars' className='conteiner'>
                                    <Link className='link' to={'/recipes/' + leo.id}>
                                        <Card className='card' name={leo.title} image={leo.img ? leo.img : leo.image} diets={leo.typeDiets} id={leo.id}/>
                                    </Link> 
                                </div>
                            );
                        })
                    }            
                </div>
                <div className='paginado'>
                <Paginado 
                    recipesPg= {recipesPg}
                    allRecipes= {allRecipes.length}
                    paginado= {paginado}
                    />
                </div>
            </div>
        </div>
    )
}