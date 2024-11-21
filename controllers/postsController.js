const posts = require('../data/posts.js')

// Index function
function index(req, res) {
    console.log("Questi sono i tuoi post")
    res.json(posts);
}

// Show function
function show(req, res) {
    const id = parseInt(req.params.id);
    console.log(`Ecco il post con id: ${id}`); 
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        return res.status(404).json({ error: 'Post non trovato' });
    }

    res.json(foundPost);
}

// Store function
function store(req, res) {
    console.log(req.body);
    const { title, slug, content, image, tags } = req.body;

    // Validazione dei dati
    const errors = validate(req);

    if (errors.length) {
        return res.status(400).json({
            error: 'Richiesta non valida',
            messages: errors,
        });
    }

    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, 
        title,
        slug,
        content,
        image,
        tags,
    };

    posts.push(newPost); 
    res.status(201).json(newPost); 
}

// Funzione di validazione
function validate(req) {
    const { title, slug, content, image, tags } = req.body;
    const errors = [];

    if (!title) {
        errors.push('Title è richiesto');
    }

    if (!slug) {
        errors.push('Slug è richiesto');
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
function update(req, res) {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        return res.status(404).json({ error: 'Post non trovato' });
    }

    const { title, slug, content, image, tags } = req.body;
    const errors = validate(req);

    if (errors.length) {
        return res.status(400).json({
            error: 'Richiesta non trovata',
            messages: errors,
        });
    }

    // Modifica il post
    foundPost.title = title || foundPost.title;
    foundPost.slug = slug || foundPost.slug;
    foundPost.content = content || foundPost.content;
    foundPost.image = image || foundPost.image;
    foundPost.tags = tags || foundPost.tags;

    res.json(foundPost);
}

// Modify function 
function modify(req, res) {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);

    if (!foundPost) {
        return res.status(404).json({ error: 'Post non trovato' });
    }

    const { title, slug, content, image, tags } = req.body;

    if (title) foundPost.title = title;
    if (slug) foundPost.slug = slug;
    if (content) foundPost.content = content;
    if (image) foundPost.image = image;
    if (tags) foundPost.tags = tags;

    res.json(foundPost);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    console.log(`Elimino il post con id: ${id}`);

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    posts.splice(postIndex, 1); 
    res.json({ message: 'Post eliminato con successo' });
}

module.exports = { index, show, store, update, modify, destroy };
