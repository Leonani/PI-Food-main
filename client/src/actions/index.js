import axios from 'axios';


//coneccion del back con el front
// export function getRecipes() {
   
    // console.log('uhagvudfy');
    
    // return async function(dispatch) {

    //     let json = await axios.get('http://localhost:3001/recipes');
    //     return dispatch({
    //         type: 'GET_RECIPES',
    //         payload: json.data
    //     })
            
    // }
    
// }
export function getRecipes(){
    return  function(dispatch){
        axios.get('http://localhost:3001/recipes')
            .then((json) => {
            return dispatch({
                type:'GET_RECIPES',
                payload: json.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}