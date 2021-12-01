const initialState = {
    recipes : []
}

function rootReducer(state= initialState, action){
    
    switch (action.type) {
        case 'GET_RECIPES':
            console.log(action.type)
            return {
                ...state,
                recipes: action.payload  
            }
            
    
        default:
          return state;
    }
}

export default rootReducer;