const initialState = {
    recipes : [],
    allRecipes : [],
    diets : []
}

//estados
function rootReducer(state= initialState, action){
    
    switch (action.type) {
        //trae todas las recetas
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_NAME_RECIPES':
            return{
                ...state,
                recipes: action.payload,
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        // hago el filtrado del estado inicial
        case 'FILTER_BY_TYPE_RECIPE':
            const allRecipes= state.allRecipes
            const typeFilter= action.payload === 'all' ? allRecipes : allRecipes.filter(e=> e.type === action.payload)
            return{
                ...state,
                recipes: typeFilter
            }
        case 'FILTER_BY_CREATED_RECIPE':            
            const createdFilter= action.payload === 'created' ? state.allRecipes.filter(e=> e.createdINBd) : state.allRecipes.filter(e=> !e.createdINBd)
            return{
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : createdFilter
            }
        case 'FILTER_BY_ORDER':
            const sortArr= action.payload === 'asc' ? state.recipes.sort(function (a, b){
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0
            }) : state.recipes.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0
            })
            return{
                ...state,
                recipes: sortArr
            }
        case 'POST_RECIPE':
            return{
                ...state
            }    
        default:
        return state;
    }
}

export default rootReducer;