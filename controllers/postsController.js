const posts = require('../data/posts.js');

// Index function
function index(req, res) {
    console.log("Questi sono i tuoi post");
    res.json(posts);
}

// Show function
function show(req, res, next) {
    const id = parseInt(req.params.id);
    console.log(`Ecco il post con id: ${id}`); 
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        return next(new Error('Post non trovato')); 
    }

    res.json(foundPost);
}

// Store function
function store(req, res, next) {
    console.log(req.body);
    const { title, content, image, tags } = req.body;

    // Validazione dei dati
    const errors = validate(req);

    if (errors.length) {
        const error = new Error('Richiesta non valida');
        error.status = 400;
        error.messages = errors;
        return next(error);
    }

    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        image,
        tags,
    };

    posts.push(newPost);
    res.status(201).json(newPost);
}

function validate(req) {
    const { title, content, image, tags } = req.body;
    const errors = [];

    if (!title) {
        errors.push('Title è richiesto');
    }

    if (!image) {
        errors.push('Immagine è richiesta');
    }

    if (!content) {
        errors.push('Contenuto è richiesto');
    }

    if (!tags || tags.length === 0) {
        errors.push('Almeno un tag è richiesto');
    }

    return errors;
}

// Update function
function update(req, res, next) {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        return next(new Error('Post non trovato')); 
    }

    const { title, content, image, tags } = req.body;
    const errors = validate(req);

    if (errors.length) {
        const error = new Error('Richiesta non valida');
        error.status = 400;
        error.messages = errors;
        return next(error); 
    }

    foundPost.title = title || foundPost.title;
    foundPost.content = content || foundPost.content;
    foundPost.image = image || foundPost.image;
    foundPost.tags = tags || foundPost.tags;

    res.json(foundPost);
}

// Modify function
function modify(req, res, next) {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        return next(new Error('Post non trovato')); 
    }

    const { title, content, image, tags } = req.body;

    if (title) foundPost.title = title;
    if (content) foundPost.content = content;
    if (image) foundPost.image = image;
    if (tags) foundPost.tags = tags;

    res.json(foundPost);
}

// Destroy function
function destroy(req, res, next) {
    const id = parseInt(req.params.id);
    console.log(`Elimino il post con id: ${id}`);

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return next(new Error('Post non trovato')); 
    }

    posts.splice(postIndex, 1);
    res.json({ message: 'Post eliminato con successo' });
}

module.exports = { index, show, store, update, modify, destroy };
