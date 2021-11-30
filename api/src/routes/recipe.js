const express = require('express')
const router = express.Router()
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');

router.post('/', async (req, res) => {
    //hago el post con todo lo que llega del body
    let{
        name,
        summary,
        score,
        healthScore,
        image,
        steps,
        diets
    } = req.body

    try{ //creo la receta
        let recipeCreate = await Recipe.create({ 
            name,
            summary,
            score,
            healthScore,
            image,
            steps,
            // no se le pasa diets porque tiene la relacion aparte.
        })

        //a la dieta la encontramos en el modelo de dietas por eso no lo ponemos en recipeCreate
        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })


        recipeCreate.addDiet(dietDB) //agregamos la dieta que coincidieron
        res.send('Dieta creada con exito')
    }catch(error){
        res.status(400).json({message: error?.message | 'Error en carga de datos'})
    }
})

module.exports = router