function notFoundHandler(req, res, next) {
    const error = new Error('Endpoint non trovato');
    error.status = 404;
    next(error); 
}

function errorHandler(err, req, res, next) {
    console.error(err.stack); 
    const status = err.status || 500;

    res.status(status).json({
        error: err.message || 'Si è verificato un errore interno',
        messages: err.messages || [],
    });
}

module.exports = { notFoundHandler, errorHandler };

