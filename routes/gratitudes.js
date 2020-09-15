const express = require('express')
const router = express.Router()

const db = require('../db')

module.exports = router

router.get('/', async (req, res) => {
    
    const results = await db.select().table('gratitudes')     
    res.send(results)
})

router.get('/:id', async (req, res) => {    
    const {id} = req.params
    const results = await db('gratitudes').where({id})    
    res.send(results)
})

router.post('/', async (req, res) => {
    
    const {sentence} = req.body

    if(!sentence) {
        res.status(400).send("Please add a sentance for what you are grateful for.")
    }
    
    const result = await db('gratitudes').insert({sentence}).returning('*')
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {sentence} = req.body

    let toUpdate = {};

    if(!sentence){
        return res.status(400).send("Please enter in something you are thankful for.")
    }

    if(sentence){
        toUpdate.sentence = sentence
    }

    const updated = await db('gratitudes')
        .where('id', '=', id)
        .update(toUpdate)
        .returning('*')

    res.send(updated)

})

router.delete('/:id', async (req, res) => {
    const {id} = req.params

    const result = await db('gratitudes')
        .where('id', '=', id)
        .del()
        .returning('*')

    res.send(result)
})

