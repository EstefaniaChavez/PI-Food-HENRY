import { getTitleRecipes } from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    console.log('-ll',action, state);
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipe: action.payload,
            }
        case 'FILTER_BY_DIET':
            const allRecipe = state.allRecipe.map(el => ({
                title: el.title,
                summary: el.summary,
                dishTypes: el.dishTypes,
                healthScore: el.healthScore,
                id: el.id,
                image: el.image,
                score: el.score,
                steps: el.steps,
                diets: el.diets.map(e => e.name)
            }))
            console.log({ allRecipe });
            const statusFiltered = allRecipe.filter(e => e.diets.includes(action.payload))
            console.log({ statusFiltered });
            return {
                ...state,
                recipes: statusFiltered,
            }
        case 'ORDER_BY_TITLE':
            const sorted = action.payload === 'a-z' ?
                state.recipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sorted,
            }
        case 'GET_TITLE_RECIPE':
            return {
                ...state,
                recipes: action.payload,
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'GET_DETAIL_RECIPE':
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
};


export default rootReducer