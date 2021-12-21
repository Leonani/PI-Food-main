const express = require('express')
const router = express.Router()
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');

router.post('/', async (req, res) => {
    //hago el post con todo lo que llega del body
    let {
        name,
        summary,
        score,
        healthScore,
        image,
        steps,
        diets,
        createdINBd
 } = req.body
    // console.log(req.body)
   

    try{ //creo la receta
        let recipeCreate = await Recipe.create({ 
            name,
            summary,
            score,
            healthScore,
            image,
            steps,
            createdINBd
            // no se le pasa diets porque tiene la relacion aparte.
        })
        // console.log(recipeCreate, 'post api')
        //a la dieta la encontramos en el modelo de dietas por eso no lo ponemos en recipeCreate
        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })

        // console.log()
        recipeCreate.addDiet(dietDB) //agregamos la dieta que coincidieron
        res.send(recipeCreate)
    }catch(error){
        res.status(400).send(error)
        console.log(error.message)
    }
})

module.exports = router