// importando o Modulo do Express
const express = require('express');

// Criando um objeto do Express
const app = express();

// resgatando os dados da requisição
app.get('/', (req, res) => {
    res.send('A simple Node app is' + 'running on this server')
    res.end()
});

//Numero da porta
const PORT = process.env.PORT || 5001;


//Executar o Servidor Node
app.listen(PORT, console.log(
    `Server started on port ${PORT}`
));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Simulado um " Banco de dados"
let books = [
    { id: 1, title: 'Livro 1' },
    { id: 2, title: 'Livro 2' },
    { id: 3, title: 'Livro 3' }
];

// Rota para obter todos os livros (metodo GET)

app.get('/books', (req, res) => {
    res.json(books);
});

//Metodo post

app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});


// Rota para o método PUT

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send('Livro não encontrado');
    }


});

// Rota para o método DELETE

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const indexToRemove = books.findIndex(book => book.id === bookId);

    if (indexToRemove !== -1) {
        const removedBook = book.splice(indexToRemove, 1);
        res.json(removedBook[0]);
    } else {
        res.status(404).send('Livro não encontrado');
    }

});