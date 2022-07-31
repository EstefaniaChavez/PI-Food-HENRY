
const { Recipe, Diet } = require('../db')
const axios = require('axios')
const { APIKEY } = process.env;

//Busqueda de la base de datos. 
const getDBData = async () => {
    try{
        const dbRecipe = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    return dbRecipe.map(e => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            image: e.image,
            // steps: e.steps,
            score: e.score,
            diets: e.diets,
        }
    })
    } catch(error){
        console.log(error)
    }
}

//Pedido a la API. 
const getApiInfo = async () => {
    try {
        const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true`)
        const apiInfo = apiURL.data.results.map(el => {
            return {
                id: el.id,
                title: el.title,
                summary: el.summary.replace(/<[^>]*>?/g, ''),
                healthScore: el.healthScore,
                image: el.image,
                // steps: el.analyzedInstructions[0]?.steps ? el.analyzedInstructions[0]?.steps : "Doesn't have steps",
                score: el.spoonacularScore ? el.spoonacularScore : "Doesn't have scored",
                diets: el.diets,
            }
        })
        return apiInfo
    }
    catch (error) {
        console.log(error)
    }
}

//INFO Api y DB 
const getInfoTotal = async () => { 
    try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBData();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
    } catch(error){
        console.log(error)
    }
}; 


// Recipe NAME: 
const nameRecipe = async (req, res) => {
    const { name } = req.query;
    const recipe = await getInfoTotal();
    console.log('recetas', recipe)
    try {
        if (name) {
            let filteredRecipes = recipe.filter(el =>
                el.title.toLowerCase().includes(name.toLowerCase()));
            console.log('filtered', filteredRecipes)
            if (filteredRecipes.length >= 1) {
                res.status(200).send(filteredRecipes);
            } else {
                res.status(404).send("No se encontró la receta solicitada.")
            }
        } else {
            res.status(200).send(recipe);
        }
    } catch (error) {
        res.status(400).send("Error")
    }
}


//ID Recipe: 
const idRecipe = async (req, res) => {
    const id = req.params.id;
    const totalRecipe = await getInfoTotal();
    if (id) {
        const recipeByID = await totalRecipe.find(el => el.id == id);
        if (recipeByID) {
            res.status(200).send(recipeByID);
        } else {
            res.status(404).send('No se encontró la receta solicitada')
        }
    }
}


//POST RECIPE
const recipesCreate = async (req, res) => {
    try {
        const {
            title,
            summary,
            score,
            healthScore,
            steps,
            image,
            diets,
        } = req.body;
        const stepsText = JSON.stringify(steps)
        const createRecipes = await Recipe.create({
            title,
            summary,
            score,
            healthScore,
            steps: stepsText,
            image,
        })
        console.log({ createRecipes })
        for (let e of diets) {
            let dietSaved = await Diet.findOne({
                where: {
                    name: e.toLowerCase()
                }
            })
            await createRecipes.addDiets(dietSaved);
        }
        res.status(201).send('Recipe created successfully')
    }
    catch (error) {
        res.status(400).send("Bad request")
    }
}
//DELETE RECIPE
const deleteRecipe = async (req, res) => {
    try{
    const id = req.params.id;
    const recipeExist = await Recipe.findOne({
        where: { id: id }
    });
    if (!recipeExist) {
        res.status(404).status("Recipe not found")
    } else {
        await recipeExist.destroy();
        res.status(200).send("Recipe deleted successfully")
    }
} catch(error) {
    res.status(400).send('Bad request')
}


}

module.exports = {
    idRecipe,
    recipesCreate,
    nameRecipe,
    deleteRecipe
}