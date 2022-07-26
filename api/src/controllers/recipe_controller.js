
const {Recipe, Diet} = require ('../db')
const axios = require('axios') 
process.env.APIKEY; 

//Busqueda de la base de datos. 
const getDBData = async () =>{
    let dbRecipe = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }
    })
}

//Pedido a la API. 

const getApiInfo = async() => {
    try {
    const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true`)
    console.log({apiURL})
    const apiInfo = apiURL.data.results.map(el => {
        return {
            title: el.title,
            summary: el.summary.replace(/<[^>]*>?/g, ''),
            healthScore: el.healthScore,
            image: el.image, 
            steps: el.analyzedInstructions[0]?.steps,
            score: el.spoonacularScore, 
            diets: el.diets,
        }
    }) 
    } 
    catch (error) {
        console.log(error)
    }
}






getApiInfo()