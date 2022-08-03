import axios from 'axios'; 

export function getRecipes(){
    return async function (dispatch){
        console.log('loooo');
        let json = await axios.get('http://localhost:3001/recipes', {})
        console.log(json.data)
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data, 
        })
    }
} 

export function filterRecipeByDiets(payload){
    return {
        type: 'FILTER_BY_DIET' ,
        payload
    }
}

export function orderByTitle(payload){
    return {
        type: 'ORDER_BY_TITLE',
        payload
    }
}

export function getDiets(){
    return async function (dispatch){
        let info = await axios.get('http://localhost:3001/diets', {

        })
        return dispatch({
            type: 'GET_DIETS',
            payload: info.data, 
        })
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        let json = await axios.post('http://localhost:3001/recipes', payload)
        return json; 
    } //Payload colocado porque traerá las acciones del form. 
}

export function getTitleRecipes(name){
    return async function (dispatch){
        try {
            const json = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: "GET_TITLE_RECIPE",
                payload: json.data, 
            })
        } catch(error){
            console.log(error)
        }
    }
}