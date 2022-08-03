import { getTitleRecipes } from "../actions";

const initialState = {
    recipes : [],
    allRecipes : [],
    diets : []
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            console.log('entró', initialState);
            return {
                ...state,
                recipes: action.payload, 
                allRecipe: action.payload, 
        }
        case 'FILTER_BY_DIET': 
                const allRecipe = state.allRecipes 
                const statusFiltered = action.payload === 'all' ? allRecipe : allRecipe.filter(e => e.status === action.payload)
                return{
                    ...state, 
                    recipes: statusFiltered, 
        } //EXPLICACIÓN DE ESTA MADRE. 
        case 'ORDER_BY_TITLE':
            const sorted = action.payload === 'asc' ? 
            state.recipes.sort(function(a,b){
                if (a.name > b.name){
                    return 1; 
                }
                if (a.name < b.name){
                    return -1;
                }
                return 0; 
            }) : 
            state.recipes.sort(function(a,b){
                if (a.name > b.name){
                    return -1; 
                }
                if (a.name < b.name){
                    return 1;
                }
                return 0; 
            })
            return{
                ...state,
                recipes : sorted,
            }
        case 'GET_TITLE_RECIPE':
            return {
                ...state, 
                recipes: action.payload, 
            } 
        case 'POST_RECIPE':
            return{
                ...state, 
            }
        case 'GET_DIETS': 
        return{
                ...state,
                diets: action.payload
        }   
        default:
                return state; 
    }
}; 


export default rootReducer