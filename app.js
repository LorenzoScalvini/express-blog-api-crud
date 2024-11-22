console.log('Hello World :D');
const express = require('express');
const postsRouter = require('./routers/posts.js');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandlers');
const app = express();
const port = 3017;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('Questa e\' la root!');
    res.send('Hello World :D');
});

app.use('/posts', postsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Il server sta ascoltando sulla porta: ${port}`);
});
