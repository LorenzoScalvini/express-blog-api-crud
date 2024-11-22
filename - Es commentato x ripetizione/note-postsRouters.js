// Importa il modulo `express` per creare il router.
const express = require('express');

// Crea un'istanza di router utilizzando il metodo `Router` di Express.
const router = express.Router();

// Importa il controller che contiene tutte le funzioni per gestire i post.
const postsController = require('../controllers/postsController.js');

// Rotta per ottenere tutti i post.
// Quando arriva una richiesta GET a `/posts`, chiama la funzione `index` del controller.
router.get('/', postsController.index);

// Rotta per ottenere un singolo post in base al suo ID.
// Quando arriva una richiesta GET a `/posts/:id`, chiama la funzione `show` del controller.
router.get('/:id', postsController.show);

// Rotta per creare un nuovo post.
// Quando arriva una richiesta POST a `/posts`, chiama la funzione `store` del controller.
router.post('/', postsController.store);

// Rotta per aggiornare completamente un post esistente.
// Quando arriva una richiesta PUT a `/posts/:id`, chiama la funzione `update` del controller.
router.put('/:id', postsController.update);

// Rotta per aggiornare parzialmente un post esistente.
// Quando arriva una richiesta PATCH a `/posts/:id`, chiama la funzione `modify` del controller.
router.patch('/:id', postsController.modify);

// Rotta per eliminare un post.
// Quando arriva una richiesta DELETE a `/posts/:id`, chiama la funzione `destroy` del controller.
router.delete('/:id', postsController.destroy);

// Esporta il router per essere utilizzato nell'applicazione principale.
module.exports = router;
