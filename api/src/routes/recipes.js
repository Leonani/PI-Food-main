const express = require('express')
const router = express.Router()
//instalo axios
const axios = require('axios');
//importo listas
const { Recipe, Diet, recipe_diet } = require('../db');
const { Sequelize } = require('sequelize');
// const {op} = require('Sequelize');

require('dotenv').config();
const {YOUR_API_KEY} = process.env;



// peticion data de api food
const getApiInfo = async () => {
    
    try {
        //traigo la info de la url
        const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
        // console.log(apiURL.data);
        //mapeo la info
        const apiInfo = await apiURL.data.results.map(e => {
            //devuelvo la info que se me pide en la consigna
            return {
                id: e.id, 
                title: e.title,
                img: e.image,
                typeDiets: e.diets.map((d) => {return{name:d}}), // un array con los tipos de dieta de esa receta
                spoonacularScore : e.spoonacularScore,   // puntuacion
                dishTypes: e.dishTypes.map((d) => {return{name:d}}), // tipo de plato
                summary: e.summary,            // un resumen del plato
                healthScore: e.healthScore,    // que tan saludable es
                analyzedInstructions: e.analyzedInstructions// el paso a paso de como se hace 
            };
        });
        return apiInfo;
    } catch (err){
        return [];
    }
}

//traigo la info de data base
const getDbInfo = async () => {
    try{
        //retorno  
        return await Recipe.findAll({
            include: {
                //incluyo la lista Diet
                model: Diet,
                attributes: ['name'],
                //mediante - comprobacion de atributos
                through: {
                    attributes:[],
                },
            }
        })
    }catch(err){
        return [];
    }
}

//juntamos info de la bd y api
const getAll = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    console.log(apiInfo, dbInfo)
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo
}

// router.get('/recipes', async (req, res) => 
// )

//ruteo por query
router.get('/', async (req,res) => {

    
    //requerimos el parametro (name) ingresado por querry
    const name = req.query.name

    if (name){
        //obtenemos las recetas que tengan la palabra ingresada por parametro query
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${YOUR_API_KEY}`);
        const {results} = resAxios.data
        const infoQuery = results.map(e => ({
            id: e.id, 
            title: e.title,
            img: e.image,
            typeDiets: e.diets.map((d) => {return{name:d}}), 
            spoonacularScore : e.spoonacularScore,   
            dishTypes: e.dishTypes.map((d) => {return{name:d}}), 
            summary: e.summary,           
            healthScore: e.healthScore,    
            analyzedInstructions: e.analyzedInstructions
        }))
        
        const cl = await getDbInfo()
        const filtercl = cl.filter(n => n === name.toLocaleLowerCase())
        let recipesName = await infoQuery.concat(filtercl);

        //si se encuentra devolvemos y si no mje correspondiente
        recipesName.length?res.status(200).send(recipesName):res.status(404).send('Perdon. No se encontro la receta.');  

        // si no hay query devolvemos todas las recetas
    } else {
        //traigo info
        let allRecipes = await getAll();
        res.status(200).send(allRecipes)
    }
})  

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const allRecipes = await getAll();
    if(id) {
        let recipeId = await allRecipes.filter(e => e.id == id)
        recipeId.length?res.status(200).json(recipeId):res.status(404).send('No se encontro la receta')
    }
})

module.exports = router