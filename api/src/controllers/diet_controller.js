const {Diet} = require('../db') 
const axios = require('axios')
const {APIKEY} = process.env

//Búsqueda y creación en la DB. 
const getDietsFromDB = async (req, res) => {
        const dataExist = await Diet.findAll();
        if (!dataExist.lenght){
            const dietAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true`)    
            const diets = dietAPI.data?.results.map((el) => el.diets); 
            const dietsConcat = diets.flat().concat("vegetarian", "ketogenic"); 
            const allDiet = [...new Set(dietsConcat)]; 

            for (let diet in allDiet) {
                Diet.findOrCreate({
                    where: { name : allDiet[diet] }
                })
            };
            const allDiets = await Diet.findAll(); 
            res.status(201).send(allDiets); 
        } 
        else {
            res.status(200).send(dataExist); 
        }
    }
 
module.exports = {
    getDietsFromDB
}