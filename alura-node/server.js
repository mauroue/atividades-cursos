const http = require("http")
const port = 3000;


const rotas = {
    '/': 'Curso de Node',
    '/livros': 'Entrei na pag de livros',
    '/autores': 'Listagem de autores',
    '/editora': 'pagina de editora',
    '/sobre': 'info sobre o projeto'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Curso de Node');
})


server.listen(port, () => {
    console.log(`Servidor escutando em http:localhost:${port}`)
})