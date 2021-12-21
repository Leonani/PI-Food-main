const initialState = {
    recipes : [],
    allRecipes : [],
    diets : [],
    dates: [],
    detail: []
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
            console.log(action.payload, 'reducer name')
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
            const typeFilter = allRecipes.filter(recipe => recipe.typeDiets.find(diet => {
              console.log(diet)  
              if (diet.name === action.payload) {
                return recipe
              }
            }))
            return{
                ...state,
                recipes: typeFilter
            } 
        case 'FILTER_BY_CREATED_RECIPE':            
            const createdFilter= action.payload === 'created' ? state.allRecipes.filter(e=> e.createdINBd) : state.allRecipes.filter(e=> !e.createdINBd)
            // console.log(recipes,'reducer')
            return{
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : createdFilter
            }
        case 'GET_DATABASE':
            const datBase = state.recipesAll.filter(recipe => { 
                if (!recipe.hasOwnProperty('createdINBd')) 
                console.log(recipe)
                return recipe
            })
            const join = datBase.concat(action.payload)
            // console.log(join, 'desde reducer')
                
            return{
                ...state,
                dates: action.payload,
                recipes: join,
                allRecipes: join
            }
        case 'FILTER_BY_ORDER':
            const sortArr= action.payload === 'asc' ? state.allRecipes.sort(function (a, b){
                if(a.title > b.title){
                    return 1;
                }
                if(a.title < b.title){
                    return -1;
                }
                return 0
            }) : state.allRecipes.sort(function(a, b){
                if(a.title > b.title){
                    return -1;
                }
                if(a.title < b.title){
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
        case 'GET_DETAILS':
            // console.log(action.payload,'reducer det')
            return{
                ...state,
                detail: action.payload
            }
        default:
        return state;
    
    }
}

export default rootReducer;