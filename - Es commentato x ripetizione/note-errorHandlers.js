// Middleware per gestire le richieste a endpoint inesistenti.
function notFoundHandler(req, res, next) {
    // Crea un nuovo oggetto errore con un messaggio personalizzato.
    const error = new Error('Endpoint non trovato');
    error.status = 404; // Imposta lo stato HTTP a 404 (Not Found).
    next(error); // Passa l'errore al middleware successivo (di gestione errori).
}

// Middleware per gestire gli errori generici e restituire una risposta strutturata.
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Stampa lo stack dell'errore nella console (utile per il debug).

    // Determina lo stato HTTP. Se non specificato, utilizza 500 (Internal Server Error).
    const status = err.status || 500;

    // Restituisce una risposta JSON al client con:
    // - Il messaggio dell'errore (se presente).
    // - Un array di messaggi aggiuntivi (se fornito).
    res.status(status).json({
        error: err.message || 'Si è verificato un errore interno', // Messaggio di errore predefinito.
        messages: err.messages || [], // Messaggi aggiuntivi (opzionali, utile per errori di validazione).
    });
}

// Esporta entrambe le funzioni per poterle utilizzare in altri file.
module.exports = { notFoundHandler, errorHandler };

