// Importa il modulo `posts`, che contiene un array di post simulati da utilizzare come dati di esempio.
const posts = require('../data/posts.js');

// Funzione per elencare tutti i post.
function index(req, res) {
    console.log("Questi sono i tuoi post"); // Log per monitorare le richieste a questa funzione.
    res.json(posts); // Risponde al client con l'array di tutti i post in formato JSON.
}

// Funzione per mostrare un post specifico in base all'ID.
function show(req, res) {
    const id = parseInt(req.params.id); // Estrae l'ID dalla richiesta e lo converte in numero intero.
    console.log(`Ecco il post con id: ${id}`); // Log dell'ID richiesto.
    const foundPost = posts.find((post) => post.id === id); // Cerca il post con l'ID corrispondente.

    if (!foundPost) {
        // Se non trova il post, restituisce un errore 404 e un messaggio JSON.
        return res.status(404).json({ error: 'Post non trovato' });
    }

    res.json(foundPost); // Risponde al client con il post trovato.
}

// Funzione per creare un nuovo post.
function store(req, res) {
    console.log(req.body); // Log dei dati inviati nella richiesta.
    const { title, content, image, tags } = req.body; // Estrae i campi necessari dal corpo della richiesta.

    const errors = validate(req); // Valida i dati ricevuti.

    if (errors.length) {
        // Se ci sono errori di validazione, restituisce un errore 400 con i dettagli.
        return res.status(400).json({
            error: 'Richiesta non valida',
            messages: errors,
        });
    }

    // Crea un nuovo oggetto post con un ID incrementale e i dati ricevuti.
    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        image,
        tags,
    };

    posts.push(newPost); // Aggiunge il nuovo post all'array di post.
    res.status(201).json(newPost); // Risponde al client con il nuovo post creato e uno status 201 (creato).
}

// Funzione per validare i dati del post.
function validate(req) {
    const { title, content, image, tags } = req.body; // Estrae i campi dal corpo della richiesta.
    const errors = []; // Array per raccogliere eventuali errori di validazione.

    if (!title) {
        errors.push('Title è richiesto'); // Controlla se il titolo è presente.
    }

    if (!image) {
        errors.push('Immagine è richiesta'); // Controlla se l'immagine è presente.
    }

    if (!content) {
        errors.push('Contenuto è richiesto'); // Controlla se il contenuto è presente.
    }

    if (!tags || tags.length === 0) {
        errors.push('Almeno un tag è richiesto'); // Controlla se almeno un tag è presente.
    }

    return errors; // Restituisce l'array degli errori (vuoto se nessun errore).
}

// Funzione per aggiornare un post esistente.
function update(req, res) {
    const id = parseInt(req.params.id); // Estrae l'ID dalla richiesta.
    const foundPost = posts.find((post) => post.id === id); // Cerca il post con l'ID specificato.

    if (!foundPost) {
        // Se il post non esiste, restituisce un errore 404.
        return res.status(404).json({ error: 'Post non trovato' });
    }

    const { title, content, image, tags } = req.body; // Estrae i campi dal corpo della richiesta.
    const errors = validate(req); // Valida i dati ricevuti.

    if (errors.length) {
        // Se ci sono errori, restituisce un errore 400 con i dettagli.
        return res.status(400).json({
            error: 'Richiesta non valida',
            messages: errors,
        });
    }

    // Aggiorna il post esistente solo con i campi forniti nella richiesta.
    foundPost.title = title || foundPost.title;
    foundPost.content = content || foundPost.content;
    foundPost.image = image || foundPost.image;
    foundPost.tags = tags || foundPost.tags;

    res.json(foundPost); // Risponde al client con il post aggiornato.
}

// Funzione per eliminare un post.
function destroy(req, res) {
    const id = parseInt(req.params.id); // Estrae l'ID dalla richiesta.
    console.log(`Elimino il post con id: ${id}`); // Log dell'ID da eliminare.

    const postIndex = posts.findIndex((post) => post.id === id); // Trova l'indice del post con l'ID specificato.

    if (postIndex === -1) {
        // Se non trova il post, restituisce un errore 404.
        return res.status(404).json({ error: 'Post non trovato' });
    }

    posts.splice(postIndex, 1); // Rimuove il post dall'array.
    res.json({ message: 'Post eliminato con successo' }); // Risponde con un messaggio di conferma.
}

// Esporta tutte le funzioni come oggetto per essere utilizzate nel router.
module.exports = { index, show, store, update, destroy };
