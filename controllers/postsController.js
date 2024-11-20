const pizzas = require('../data/posts.js')

//index function
function index (req, res) {
    console.log("Questi sono i tuoi post")
}

//show function
function show (req, res) {
    console.log(`Ecco il post con id: ${id}`) 
}

//store function
function store (req, res) {
    
}

//update function
function update (req, res) {
    
}

//modify function
function modify (req, res) {
    
}

//destroy function
function destroy (req, res) {
    console.log(`Elimino la pizza con id: ${id}`)
}

module.exports = { index, show, store, update, modify, destroy }