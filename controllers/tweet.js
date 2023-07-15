const express = require('express');
const Tweet = require('../models/tweets')

const router = express.Router()
// index 
router.get('/:id', async (req, res) => {
    try {

    } catch(error) {
        res.status(400).json({error})
    }
})

// show 
router.get('/:id', async (req, res) => {
    try {

    } catch(error) {
        res.status(400).json({error})
    }
})

// create
router.get('/', async (req, res) => {
    try {

    } catch(error) {
        res.status(400).json({error})
    }
})

// update
router.get('/:id', async (req, res) => {
    try {

    } catch(error) {
        res.status(400).json({error})
    }
})

//  destroy 
router.delete('/:id', async (req, res) => {
    try {

    } catch(error) {
        res.status(400).json({error})
    }
})

export default router