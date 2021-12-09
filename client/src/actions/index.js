import axios from 'axios';


//coneccion del back con el front de recipes
export function getRecipes() {
    
    return async function(dispatch) {

        let json = await axios.get('http://localhost:3001/recipes');
        // console.log(json.data,'get action')
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

// export function getRecipes(){
//     return  function(dispatch){
//         axios.get('http://localhost:3001/recipes')
//             .then((json) => {
//             return dispatch({
//                 type:'GET_RECIPES',
//                 payload: json.data
//             })
//         }).catch((error) => {
//             console.log(error)
//         })
//     }
// }

//-coneccion del back con el front de diets
export function getDiets(){
    return async function(dispatch) {
        var info= await axios('http://localhost:3001/diets');
        return dispatch ({
            type: 'GET_DIETS', 
            payload: info.data
        })
    }
}

export function postRecipes(payload){
    return async function(dispatch) {
        const data = await axios.post('http://localhost:3001/recipe', payload)
        return data;
    }
}

//------------------busqueda-------------------------------
export function getNameRecipes(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + name);
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
            
        }catch(err){
            console.log(err)
        }
    }
}

//-----------------actions filters busqueda-------------------//evitemos porner logica en acciones, hacerlo en reducer

export function filetrRecipesByTypes(payload){
    return{ 
        type: 'FILTER_BY_TYPE_RECIPE',
        payload
    }
}

export function getDatabase() {
    return async function (dispatch) {
        

        try {
            let dataBase = await axios.get(`http://localhost:3001/recipes/data`)
           
            return dispatch({
                type: 'GET_DATABASE',
                payload: dataBase.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterRecipesByCreated(payload){
    return async function (dispatch){
        try{
            return dispatch({
                type: 'FILTER_BY_CREATED_RECIPE',
                payload

            })
            
        }catch(error){
            console.log(error)
        }
    }
}

export function orderByName(payload){
    return{
        type: 'FILTER_BY_ORDER',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch) {
        try{
            let json = await axios(`http://localhost:3001/recipes/${id}`)
            // console.log(json.data,'action id')
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
            
        }catch(error){
            console.log(error)
        }
    }

}
