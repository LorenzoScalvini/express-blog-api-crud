// Stampa un messaggio sulla console per verificare che l'applicazione è in esecuzione.
console.log('Hello World :D');

// Importa il modulo `express`, un framework che semplifica la creazione di server web in Node.js.
const express = require('express');

// Importa il router per le rotte relative ai post. Questo gestirà tutte le operazioni CRUD sui post.
const postsRouter = require('./routers/posts.js');

// Importa i middleware per la gestione degli errori:
// - `notFoundHandler`: gestisce richieste a endpoint non esistenti.
// - `errorHandler`: gestisce errori generici e invia risposte strutturate ai client.
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandlers');

// Crea un'istanza dell'applicazione Express.
const app = express();

// Definisce la porta su cui il server ascolterà le richieste.
const port = 3017;

// Aggiunge il middleware di parsing del corpo delle richieste in formato JSON.
// Permette all'applicazione di interpretare i dati JSON inviati nei body delle richieste.
app.use(express.json());

// Aggiunge il middleware per servire file statici dalla cartella `public`.
// Qualsiasi file nella directory `public` (es. immagini, CSS, JavaScript statico) sarà accessibile direttamente.
app.use(express.static('public'));

// Definisce una rotta per l'endpoint principale (`/`).
// Quando si accede alla radice del server, viene stampato un messaggio nella console e viene inviata una risposta al client.
app.get('/', (req, res) => {
    console.log('Questa e\' la root!');
    res.send('Hello World :D');
});

// Utilizza il router `postsRouter` per tutte le richieste alla rotta `/posts`.
// Questo significa che qualsiasi operazione sui post sarà gestita dal file `routers/posts.js`.
app.use('/posts', postsRouter);

// Aggiunge il middleware `notFoundHandler`.
// Se nessuna delle rotte precedenti viene soddisfatta, questo middleware intercetterà la richiesta e restituirà un errore 404.
app.use(notFoundHandler);

// Aggiunge il middleware `errorHandler`.
// Se un errore viene generato in qualsiasi parte del codice, questo middleware lo gestirà e invierà una risposta strutturata al client.
app.use(errorHandler);

// Fa partire il server e lo mette in ascolto sulla porta definita sopra (`3017`).
// Una volta avviato con successo, stampa un messaggio nella console per indicare che il server è in esecuzione.
app.listen(port, () => {
    console.log(`Il server sta ascoltando sulla porta: ${port}`);
});
