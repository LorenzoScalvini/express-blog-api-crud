const posts = require('../data/posts.js')

//index function
function index (req, res) {
    console.log("Questi sono i tuoi post")
    res.json(posts);
}

//show function
function show (req, res) {
    const id = parseInt(req.params.id)
    console.log(`Ecco il post con id: ${id}`) 
    const foundPost = posts.find((post) => post.id === id)
    let result = foundPost

    res.json(result)


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
    const id = parseInt(req.params.id)
    console.log(`Elimino il post con id: ${id}`)

    const postIndex = posts.findIndex((post) => post.id === id)
    posts.splice(postIndex, 1)
    res.json(posts);
}

module.exports = { index, show, store, update, modify, destroy }